export function parseBilibili(input = "", suppliedBvid = "", cid = "") {
  let bvid = suppliedBvid.trim();
  let page = "1";
  if (!bvid) {
    if (/^BV[0-9A-Za-z]{10}$/.test(input.trim())) bvid = input.trim();
    else {
      try {
        const url = new URL(input);
        if (!(url.hostname === "bilibili.com" || url.hostname.endsWith(".bilibili.com"))) return null;
        bvid = url.pathname.match(/\/(BV[0-9A-Za-z]{10})(?:\/|$)/)?.[1] ?? "";
        const requestedPage = url.searchParams.get("p");
        if (requestedPage && /^[1-9]\d*$/.test(requestedPage)) page = requestedPage;
      } catch { return null; }
    }
  }
  if (!/^BV[0-9A-Za-z]{10}$/.test(bvid)) return null;
  const query = new URLSearchParams({ bvid, page, autoplay: "0", high_quality: "1", danmaku: "0" });
  if (/^\d+$/.test(cid)) query.set("cid", cid);
  return { bvid, url: `https://www.bilibili.com/video/${bvid}/?p=${page}`, embed: `https://player.bilibili.com/player.html?${query}` };
}
