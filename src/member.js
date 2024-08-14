"use strict";

let app = {};
let device = "desktop";

let userId = parseInt(document.location.href.split("/").pop());
if (document.location.href.indexOf("/bookmarks/") != -1) {
  let url = document.location.href.replace("/bookmarks/artworks", "");
  userId = parseInt(url.split("/").pop());
}
let pageFromUrl = new URLSearchParams(document.location.search).get("p");
let page = pageFromUrl == undefined ? 1 : parseInt(pageFromUrl);
let type = "illust";
if (document.location.href.indexOf("bookmarks") != -1) type = "bookmark";
let pageData = {
  date: 0,
  token: null,
  user: {},
  illustIds: {},
  illusts: {},
  bookmarks: {},
  illustsPerPage: 36,
  totalIllustPages: 1,
  totalIllusts: 0,
  totalBookmarkPages: 1,
  totalBookmarks: 0,
  scroll: { height: 1, top: 1, type: "illust", page: 1 },
};
let lang = "";
if (document.location.href.indexOf("/en/") != -1) lang = "/en";

function decode(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = DOMPurify.sanitize(html);
  return txt.value;
}

function processPage() {
  return new Promise((resolve) => getAppData(resolve))
    .then(() => getMemberData())
    .then(() => {
      addLayout();
      addProfile();
      addInfo();
      addList();
    })
    .then(() => getIllustIds())
    .then(() => getIllusts())
    .then(() => getBookmarks())
    .then(() => {
      addIllusts();
      addBookmarks();
    })
    .then(() => afterLoad());
}

function getAppData(resolve) {
  chrome.runtime.sendMessage({ from: "getAppData" }, function (data) {
    app = data;
    resolve();
  });
}

function getMemberData() {
  //get parsedHead
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ from: "member", userId: userId }, function (data) {
      let parsedHead = data;
      if (parsedHead.token) pageData.token = parsedHead.token;
      //bgcache
      if (!parsedHead.timestamp) {
        pageData = parsedHead;
        resolve();
        return;
      }
      //bgrequest
      if (parsedHead.user) {
        for (let k in parsedHead.user) pageData.user = parsedHead.user[k];
        resolve();
        return;
      }
      //fetch
      //means pixiv changed their data structure or running on mobile
      device = "mobile";
      return content
        .fetch("/ajax/user/" + userId, { credentials: "same-origin" })
        .then((r) => r.json())
        .then((data) => {
          pageData.user = data.body;
          resolve();
        });
    });
  });
}

function addLayout() {
  if (pageData.scroll.height != 1 && type == pageData.scroll.type && page == pageData.scroll.page) {
    document.body.style.height = pageData.scroll.height + "px";
    window.scrollTo(0, pageData.scroll.top);
  }
  document.body.id = "memberPage";
  let title = document.createElement("title");
  title.textContent = DOMPurify.sanitize(pageData.user.name);
  document.head.appendChild(title);
  document.getElementById("menuToggle").addEventListener("click", (e) => {
    e.preventDefault();
    let className = document.getElementById("menu").className;
    document.getElementById("menu").className = className ? "" : "show";
  });
  document.getElementById("openOptions").addEventListener("click", (e) => {
    e.preventDefault();
    chrome.runtime.sendMessage({ from: "openOptions" });
  });
}

function addProfile() {
  let profile = document.createElement("div");
  profile.id = "profile";
  document.getElementById("minip").appendChild(profile);
  //svg
  let svgMessage = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve">
        <g><path d="M18.607,437.1c-10.2,5-15.9,16-14.2,27.2c1.7,11.3,10.4,20.1,21.7,21.8c6.3,1,13,1.5,19.9,1.5c17.8,0,51.3-3.5,84.7-25.8
        c35.1,18.5,74.4,28.2,114.3,28.2c65.5,0,127-25.5,173.3-71.8c95.5-95.5,95.5-251,0-346.5c-46.3-46.2-107.8-71.7-173.3-71.7
        s-127,25.5-173.2,71.7c-88.8,88.8-95.7,230.2-17.7,326.9C44.307,417.4,32.407,430.3,18.607,437.1z M96.007,96
        c39.8-39.8,92.7-61.7,149-61.7s109.2,21.9,149,61.7c82.2,82.2,82.2,215.9,0,298c-39.8,39.8-92.7,61.7-149,61.7
        c-37.6,0-74.5-10-106.7-29c-2.7-1.6-5.7-2.4-8.7-2.4c-3.7,0-7.4,1.2-10.5,3.6c-23.1,18-47.1,23.5-63.4,24.9
        c13.6-12.2,25.1-29,34.3-50.1c2.7-6.1,1.6-13.2-2.9-18.2C13.507,301.4,17.407,174.6,96.007,96z"/>
        <circle cx="245.007" cy="245" r="17.2"/>
        <circle cx="306.307" cy="245" r="17.2"/>
        <circle cx="183.807" cy="245" r="17.2"/></g></svg>
    `;
  //follow
  let follow = "";
  if (pageData.user.isFollowed == false) {
    follow = `<button id="follow" rel="minip">${chrome.i18n.getMessage("buttonFollow")}</button>`;
  } else {
    follow = `<button id="follow" rel="minip" class="inactive">${chrome.i18n.getMessage("buttonFollowing")}</button>`;
  }
  //html
  let avatarImg = pageData.user.imageBig;
  if (app.opts.useCdn && app.opts.cdnUrl) avatarImg = avatarImg.replace("https://i.pximg.net", app.opts.cdnUrl);
  let html = `
        <div id="avatar">
            <div id="avatarPic"><a href="${lang}/users/${parseInt(
    pageData.user.userId
  )}"><img src="${avatarImg}" /></a></div>
            <div id="avatarUsername"><a href="${lang}/users/${parseInt(pageData.user.userId)}">${
    pageData.user.name
  }</a></div>
            <div id="avatarAction">
                ${follow}
                <a id="message" href="/messages.php?receiver_id=${parseInt(pageData.user.userId)}">${svgMessage}</a>
            </div>
        </div>
    `;
  profile.innerHTML = DOMPurify.sanitize(html);
  if (pageData.user.isFollowed == false) {
    document.getElementById("follow").addEventListener("click", followUser);
  }
}

function followUser(e) {
  e.preventDefault();
  let target = document.getElementById("follow");
  target.removeEventListener("click", followUser);
  if (pageData.token == null) return;
  let token = DOMPurify.sanitize(pageData.token);
  let userId = parseInt(pageData.user.userId);
  //desktop
  let url = "/bookmark_add.php";
  let headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "x-csrf-token": token,
  };
  let body = `mode=add&type=user&user_id=${userId}&tag=&restrict=0&format=json`;
  //mobile
  if (device == "mobile") {
    url = "/touch/ajax_api/ajax_api.php";
    headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      Accept: "application/json, text/javascript, */*; q=0.01",
      "X-Requested-With": "XMLHttpRequest",
    };
    body = `mode=add_bookmark_user&restrict=0&tt=${token}&user_id=${userId}`;
  }
  content
    .fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      headers: headers,
      body: body,
    })
    .then((r) => r.json())
    .then(() => {
      target.className = "inactive";
      target.innerHTML = DOMPurify.sanitize(chrome.i18n.getMessage("buttonFollowing"));
      pageData.user.isFollowed = true;
    });
}

function addInfo() {
  let info = document.createElement("div");
  info.id = "userInfo";
  let profile = document.getElementById("profile");
  profile.appendChild(info);
  if ("webpage" in pageData.user == false) return;
  //svg
  let svgRegion = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px" y="0px"
    viewBox="0 0 489.827 489.827" style="enable-background:new 0 0 489.827 489.827;"
    xml:space="preserve">
        <g><path d="M237.777,0.127c-99.3,3.4-181.3,80.6-190.8,179.4c-1.8,19-1,38.2,2.6,56.8c0.1,0.8,0.5,3,1.3,6.5
        c3,13.5,7.5,26.6,13.3,39.2c20.2,47.7,64.3,121.1,159.7,200.2c5.9,4.9,13.4,7.6,21,7.6c7.7,0,15.1-2.7,21-7.6
        c95.3-79.1,139.4-152.5,159.7-200.2c5.8-12.6,10.3-25.8,13.3-39c0.5-2.2,1-4.3,1.3-6.4l0,0c2.4-12.4,3.6-25.1,3.6-37.7
        C443.777,86.827,350.477-3.873,237.777,0.127z M406.477,230.127c0,0.2-0.1,0.4-0.1,0.5c-0.1,0.3-0.3,1.8-1,4.6
        c-2.5,11.2-6.3,22.2-11.1,32.6c-0.1,0.2-0.2,0.3-0.2,0.5c-18.6,44.1-59.6,112.2-149.2,186.7c-89.6-74.6-130.6-142.7-149.2-186.7
        c-0.1-0.2-0.1-0.3-0.2-0.5c-4.8-10.5-8.6-21.4-11.1-32.8c-0.5-2.3-0.8-3.7-0.9-4.2c0-0.2-0.1-0.5-0.1-0.7
        c-3-15.5-3.7-31.5-2.2-47.3c7.9-81.7,75.7-145.5,157.9-148.4c2-0.1,3.9-0.1,5.9-0.1c90.7,0,164.6,73.8,164.6,164.6
        C409.477,209.327,408.477,219.827,406.477,230.127z"/>
        <path d="M244.877,95.527c-58.1,0-105.5,47.3-105.5,105.5s47.4,105.4,105.5,105.4s105.5-47.3,105.5-105.5
        S302.977,95.527,244.877,95.527z M244.877,272.127c-39.2,0-71.2-31.9-71.2-71.2c0-39.2,31.9-71.2,71.2-71.2
        c39.2,0,71.2,31.9,71.2,71.2S284.077,272.127,244.877,272.127z"/></g></svg>`;
  let svgBookmark = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px" y="0px"
    viewBox="0 0 485.3 485.3" style="enable-background:new 0 0 485.3 485.3;" xml:space="preserve">
        <g><path d="M349.6,28.95c-36.3,0-70.5,14.2-96.2,39.9l-10.6,10.6L232,68.65c-25.7-25.7-59.9-39.9-96.2-39.9
        c-36.2,0-70.3,14.1-96,39.8S0,128.35,0,164.65s14.2,70.4,39.9,96.1l190.5,190.5l0.4,0.4c3.3,3.3,7.7,4.9,12,4.9
        c4.4,0,8.8-1.7,12.1-5l190.5-190.5c25.7-25.7,39.9-59.8,39.9-96.1s-14.1-70.5-39.8-96.1C419.9,43.05,385.8,28.95,349.6,28.95z
        M421.2,236.75l-178.3,178.4L64.2,236.45c-19.2-19.2-29.8-44.7-29.9-71.9c0-27.1,10.5-52.6,29.7-71.8
        c19.2-19.1,44.7-29.7,71.7-29.7c27.2,0,52.7,10.6,72,29.9l22.9,22.9c6.4,6.4,17.8,6.4,24.3,0l22.8-22.8
        c19.2-19.2,44.8-29.8,71.9-29.8s52.6,10.6,71.8,29.8c19.2,19.2,29.8,44.7,29.7,71.9C451.1,192.05,440.5,217.55,421.2,236.75z"/></g>
        </svg>`;
  let svgWebpage = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px" y="0px"
    viewBox="0 0 490.2 490.2" style="enable-background:new 0 0 490.2 490.2;" xml:space="preserve">
        <g><path d="M341.1,34.3h90.5l-206.9,207c-6.7,6.7-6.7,17.6,0,24.3c3.3,3.3,7.7,5,12.1,5s8.8-1.7,12.1-5l207-207v90.5
        c0,9.5,7.7,17.2,17.1,17.2c9.5,0,17.2-7.7,17.2-17.2V17.2C490.2,7.7,482.5,0,473,0H341.1c-9.5,0-17.2,7.7-17.2,17.2
        C324,26.6,331.6,34.3,341.1,34.3z"/>
        <path d="M102.9,490.2h284.3c56.8,0,102.9-46.2,102.9-102.9V253.4c0-9.5-7.7-17.1-17.2-17.1s-17.1,7.7-17.1,17.1v133.8
        c0,37.8-30.8,68.6-68.6,68.6H102.9c-37.8,0-68.6-30.8-68.6-68.6V161.4V103c0-37.8,30.8-68.6,68.6-68.6h132.7
        c9.5,0,17.1-7.7,17.1-17.2S245,0,235.6,0H102.9C46.1,0,0,46.2,0,102.9v58.4v225.9C0,444,46.2,490.2,102.9,490.2z"/></g></svg>`;
  let svgMedia = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px" y="0px"
    viewBox="0 0 489.428 489.428" style="enable-background:new 0 0 489.428 489.428;"
    xml:space="preserve">
        <g><path d="M244.674,318.414c12.5-0.2,24.2-1.9,34.9-5.1c11.3,22.7,45.3,57,145.5,82.2c29.4,7.5,31.2,44.5,29.7,65.9
        c-0.7,9.4,6.5,17.6,15.9,18.3c0.4,0,0.8,0,1.2,0c8.9,0,16.5-6.9,17.1-15.9c3.8-54.6-16.4-91.6-55.6-101.6
        c-91.5-23-116.2-51.5-122.8-64c6.4-4.6,12.4-9.9,17.8-16.1c45.6-51.4,38.2-139.2,37.3-147.9c-5.3-114-94.6-124.1-121.9-124.5
        h-0.7c-0.2,0-0.4,0-0.7,0h-0.6c-56.3,0.6-117.8,33.7-122.2,124.5c-0.9,8.7-8.3,96.5,37.3,147.9c6.2,7,13.2,13.1,20.7,18.1
        c-8.1,13-34.9,40.3-121.6,62c-39.1,9.9-59.4,47-55.5,101.5c0.6,9,8.2,15.9,17.1,15.9c0.4,0,0.8,0,1.2,0
        c9.4-0.7,16.6-8.9,15.9-18.3c-1.5-21.4,0.4-58.4,29.7-65.9c97.4-24.4,132.5-57.7,144.8-81.2c9.8,2.6,20.3,4,31.5,4.2H244.674z
         M242.174,284.114c-25.5-0.3-45-8.4-59.6-24.7c-36.9-41.5-28.9-121.3-28.9-122.1c0-0.4,0.1-0.7,0.1-1.1
        c3.6-79.4,56.9-91.9,88.4-92.2h0.5h0.6c31.4,0.4,84.7,13,88.3,92.2c0,0.3,0,0.7,0.1,1c0.1,0.8,8.1,80.6-28.9,122.1
        c-14.6,16.4-34,24.4-59.6,24.7h-1L242.174,284.114L242.174,284.114z"/></g></svg>`;
  let html = "";
  //region
  if (pageData.user.region.name != null) {
    html += `<div id="region"><span>${svgRegion}&nbsp;${pageData.user.region.name}</span></div>`;
  }
  //bookmarks
  html += `<div id="bookmarks">
        <a href="${lang}/users/${parseInt(
    pageData.user.userId
  )}/bookmarks/artworks">${svgBookmark}&nbsp;${chrome.i18n.getMessage("menuBookmarks")}</a>
    </div>`;
  //links
  if (pageData.user.social.length > 0 || pageData.user.webpage != null) {
    html += `<div id="social">`;
    if (pageData.user.webpage != null) {
      html += `<a href="${pageData.user.webpage}">${svgWebpage}&nbsp;Web</a>`;
    }
    for (let media in pageData.user.social) {
      media = DOMPurify.sanitize(media);
      html += `<a id="media_${media}" href="${pageData.user.social[media].url}">${svgMedia}&nbsp;${media}</a>`;
    }
    html += `</div>`;
  }
  //comment
  if (pageData.user.commentHtml != "") {
    html += `<div id="comment">${decode(pageData.user.commentHtml)}</div>`;
  }
  info.innerHTML = DOMPurify.sanitize(html);
  //calculate scroll
  if (profile.scrollHeight > (window.innerHeight / 100) * 70) {
    //70vh
    let more = document.createElement("a");
    more.id = "more";
    more.href = "#";
    more.innerHTML = DOMPurify.sanitize(chrome.i18n.getMessage("buttonMore"));
    profile.appendChild(more);
    more.addEventListener("click", function (e) {
      e.preventDefault();
      this.style.display = "none";
      document.getElementById("userInfo").parentNode.className = "scroll";
    });
  }
}

function addList() {
  let list = document.createElement("div");
  list.id = "list";
  list.innerHTML = DOMPurify.sanitize(chrome.i18n.getMessage("msgLoading"));
  document.getElementById("minip").appendChild(list);
}

function getIllustIds() {
  if (type == "bookmark") return;
  //bg cache
  if (Object.keys(pageData.illustIds).length > 0) return;
  //fetch
  return content
    .fetch("/ajax/user/" + userId + "/profile/all", { credentials: "same-origin" })
    .then((r) => r.json())
    .then((r) => r.body)
    .then((data) => {
      pageData.illustIds = Object.assign(data.illusts, data.manga);
      pageData.totalIllusts = Object.keys(pageData.illustIds).length;
      pageData.totalIllustPages = Math.ceil(pageData.totalIllusts / pageData.illustsPerPage);
    });
}

function getIllusts() {
  if (type == "bookmark") return;
  //bg cache
  if (page in pageData.illusts) return;
  //fetch
  let params = "?";
  let reverseIds = [];
  for (let id in pageData.illustIds) {
    reverseIds.push(parseInt(id));
  }
  reverseIds.sort(function (a, b) {
    return b - a;
  });
  let offset = (page - 1) * pageData.illustsPerPage;
  let limit = offset + pageData.illustsPerPage;
  for (let i = offset; i < limit; i++) {
    let id = reverseIds[i];
    if (id == undefined) break;
    //params += 'ids[]='+id+'&';
    params += "ids%5B%5D=" + id + "&";
  }
  //params += 'is_manga_top=0';
  params += "work_category=illustManga&is_first_page=1";
  return content
    .fetch("/ajax/user/" + userId + "/profile/illusts" + params, { credentials: "same-origin" })
    .then((r) => r.json())
    .then((r) => r.body)
    .then((data) => (pageData.illusts[page] = data.works));
}

function getBookmarks() {
  if (type == "illust") return;
  //bg cache
  if (page in pageData.bookmarks) return;
  //fetch
  let offset = (page - 1) * 36;
  let params = "?tag=&offset=" + offset + "&limit=" + pageData.illustsPerPage + "&rest=show";
  return content
    .fetch("/ajax/user/" + userId + "/illusts/bookmarks" + params, { credentials: "same-origin" })
    .then((r) => r.json())
    .then((r) => r.body)
    .then((data) => {
      pageData.bookmarks[page] = data.works;
      pageData.totalBookmarks = data.total;
      pageData.totalBookmarkPages = Math.ceil(pageData.totalBookmarks / pageData.illustsPerPage);
    });
}

function addIllusts() {
  if (type == "bookmark") return;
  let list = document.getElementById("list");
  list.innerHTML = "";
  //pagination
  let offset = Math.max(1, page - 2);
  offset = Math.min(Math.max(1, pageData.totalIllustPages - 4), offset);
  let limit = offset + 5;
  let pagination = `<div class="pagination">`;
  let url = new URLSearchParams(document.location.search);
  for (let i = offset; i < limit; i++) {
    if (i > pageData.totalIllustPages) break;
    let status = i == page ? "inactive" : "";
    url.set("p", i);
    let pageUrl = document.location.pathname + "?" + url.toString();
    pagination += `<a href="${pageUrl}" class="${status}">${i}</a>`;
  }
  pagination += `</div>`;
  //illusts
  let html = `${pagination}<ul>`;
  let ids = [];
  for (let id in pageData.illusts[page]) {
    ids.push(parseInt(id));
  }
  ids.sort(function (a, b) {
    return b - a;
  });
  for (let id of ids) {
    let illust = pageData.illusts[page][id];
    let illustUrl = illust.url;
    if (app.opts.useCdn && app.opts.cdnUrl) illustUrl = illustUrl.replace("https://i.pximg.net", app.opts.cdnUrl);
    let count = illust.pageCount > 1 ? `<i>${parseInt(illust.pageCount)}</i>` : "";
    count = illust.illustType == 2 ? `<i class="ugoira">&#9655;</i>` : count;
    html += `
            <li>
                <a class="illust" href="${lang}/artworks/${parseInt(illust.id)}">
                    <span><img src="${illustUrl}" /></span>${illust.title}
                </a>
                ${count}
            </li>
        `;
  }
  html += `</ul>${pagination}`;
  list.innerHTML = DOMPurify.sanitize(html);
}

function addBookmarks() {
  if (type == "illust") return;
  let list = document.getElementById("list");
  list.innerHTML = "";
  //pagination
  let offset = Math.max(1, page - 2);
  offset = Math.min(Math.max(1, pageData.totalBookmarkPages - 4), offset);
  let limit = offset + 5;
  let pagination = `<div class="pagination">`;
  let url = new URLSearchParams(document.location.search);
  for (let i = offset; i < limit; i++) {
    if (i > pageData.totalBookmarkPages) break;
    let status = i == page ? "inactive" : "";
    url.set("p", i);
    let pageUrl = document.location.pathname + "?" + url.toString();
    pagination += `<a href="${pageUrl}" class="${status}">${i}</a>`;
  }
  pagination += `</div>`;
  //illusts
  let html = `${pagination}<ul>`;
  for (let illust of pageData.bookmarks[page]) {
    let illustUrl = illust.url;
    if (app.opts.useCdn && app.opts.cdnUrl) illustUrl = illustUrl.replace("https://i.pximg.net", app.opts.cdnUrl);
    let count = illust.pageCount > 1 ? `<i>${parseInt(illust.pageCount)}</i>` : "";
    count = illust.illustType == 2 ? `<i>${chrome.i18n.getMessage("iconAnimation")}</i>` : count;
    html += `
            <li>
                <a class="illust" href="${lang}/artworks/${parseInt(illust.id)}">
                    <span><img src="${illustUrl}" /></span>
                </a>
                <a class="by" href="/users/${parseInt(illust.userId)}">
                    <span><img src="${illust.profileImageUrl}" /></span><b>${illust.userName}</b>
                </a>
                ${count}
            </li>
        `;
  }
  html += `</ul>${pagination}`;
  list.innerHTML = DOMPurify.sanitize(html);
}

function afterLoad() {
  window.addEventListener("beforeunload", saveState);
}

function saveState() {
  if (pageData.date == 0) pageData.date = new Date();
  pageData.scroll = {
    height: document.body.scrollHeight,
    top: document.documentElement.scrollTop,
    type: type,
    page: page,
  };
  chrome.runtime.sendMessage({ from: "saveMember", data: pageData });
}

(function () {
  return processPage();
})();
