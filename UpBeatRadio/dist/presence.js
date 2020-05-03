const presence = new Presence({
  clientId: "682781181863133220"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData = {
    largeImageKey: "upbeat"
  };

  const paused = document
    .querySelector("#radioPlayer > span > i")
    .className.includes("fa-play");
  const newsreporterapply =
    document.querySelector("#modalmediaAppButton") !== null;
  const partner = document.querySelector("#modalpartnerEnquiryButton") !== null;
  const request = document.querySelector("#modalrequestFormModal") !== null;
  const enquiry = document.querySelector("#modalcontactUsButton") !== null;
  const djapply = document.querySelector("#modaldjAppButton") !== null;
  const feedback = document.querySelector("#modalundefined") !== null;
  const editingbio = document.querySelector("#accountBio") !== null;
  const format1 = await presence.getSetting("sFormatNoDj1");
  const format2 = await presence.getSetting("sFormatNoDj2");
  const elapsed = await presence.getSetting("tElapsed");
  const format = await presence.getSetting("sFormat");
  const info = await presence.getSetting("sInfo");
  const dj = await presence.getSetting("sDJ");
  let djType;

  if (elapsed) presenceData.startTimestamp = browsingStamp;

  if (info) {
    if (document.location.pathname.includes("/UpBeat.Home")) {
      if (paused) {
        presenceData.details = "Viewing the main page...";
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = format
          .replace("%song%", document.querySelector(".stats-song").textContent)
          .replace(
            "%artist%",
            document.querySelector(".stats-artist").textContent
          );
      } else {
        if (document.querySelector(".stats-djName").textContent == "UpBeat") {
          djType = "AutoDJ - ";
        } else {
          djType = "DJ: ";
        }

        presenceData.smallImageKey = "play";

        if (dj) {
          presenceData.details = format
            .replace(
              "%song%",
              document.querySelector(".stats-song").textContent
            )
            .replace(
              "%artist%",
              document.querySelector(".stats-artist").textContent
            );
          presenceData.state =
            djType + document.querySelector(".stats-djName").textContent;
        } else {
          presenceData.details = format1
            .replace(
              "%song%",
              document.querySelector(".stats-song").textContent
            )
            .replace(
              "%artist%",
              document.querySelector(".stats-artist").textContent
            );
          presenceData.state = format2
            .replace(
              "%song%",
              document.querySelector(".stats-song").textContent
            )
            .replace(
              "%artist%",
              document.querySelector(".stats-artist").textContent
            );
        }
      }
    } else if (document.location.pathname.includes("/News.Article")) {
      presenceData.details =
        "Reading article: " +
        document.querySelector(".title").textContent.trim();
      presenceData.state =
        "Written by: " + document.querySelector(".info > a").textContent.trim();
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/Account.Profile")) {
      presenceData.details = "Viewing profile of:";
      presenceData.state = document.querySelector(
        ".profileName > span"
      ).textContent;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/Account.Settings")) {
      presenceData.details = "Changing their settings...";
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/Radio.RecentlyPlayed")) {
      presenceData.details = "Viewing the";
      presenceData.state = "recently played songs";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/UpBeat.AboutUs")) {
      presenceData.details = "Reading about UpBeat";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/UpBeat.OurAffiliates")) {
      presenceData.details = "Viewing the";
      presenceData.state = "UpBeat affiliates";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/Community.Members")) {
      let type = document
        .querySelector("#mainContent > div.m-b-md.m-t-sm > ul > .active > a")
        .textContent.toLowerCase();
      if (type == "vip's") type = "VIP";
      presenceData.details = "Viewing the";
      presenceData.state = type + " members";
      presenceData.smallImageKey = "reading";
    } else if (document.querySelector(".bigTitle") !== null) {
      let type = document.querySelector(".bigTitle").textContent.toLowerCase();
      if (type == "faq's") type = "FAQ's";
      presenceData.details = "Viewing the";
      presenceData.state = type;
      presenceData.smallImageKey = "reading";
    }

    if (request) {
      presenceData.details = "Sending in a request...";
      presenceData.smallImageKey = "writing";
    } else if (feedback) {
      presenceData.details = "Sending in feedback...";
      presenceData.smallImageKey = "writing";
    } else if (djapply) {
      presenceData.details = "Applying for:";
      presenceData.state = "Radio Presenter";
      presenceData.smallImageKey = "writing";
    } else if (newsreporterapply) {
      presenceData.details = "Applying for:";
      presenceData.state = "News Reporter";
      presenceData.smallImageKey = "writing";
    } else if (editingbio) {
      presenceData.details = "Editing their bio";
      presenceData.smallImageKey = "writing";
    } else if (enquiry) {
      presenceData.details = "Sending in a";
      presenceData.state = "general enquiry";
      presenceData.smallImageKey = "writing";
    } else if (partner) {
      presenceData.details = "Sending in a";
      presenceData.state = "partner enquiry";
      presenceData.smallImageKey = "writing";
    }
  } else {
    if (document.querySelector(".stats-djName").textContent == "UpBeat") {
      djType = "AutoDJ - ";
    } else {
      djType = "DJ: ";
    }

    if (dj) {
      presenceData.details = format
        .replace("%song%", document.querySelector(".stats-song").textContent)
        .replace(
          "%artist%",
          document.querySelector(".stats-artist").textContent
        );
      presenceData.state =
        djType + document.querySelector(".stats-djName").textContent;
    } else {
      presenceData.details = format1
        .replace("%song%", document.querySelector(".stats-song").textContent)
        .replace(
          "%artist%",
          document.querySelector(".stats-artist").textContent
        );
      presenceData.state = format2
        .replace("%song%", document.querySelector(".stats-song").textContent)
        .replace(
          "%artist%",
          document.querySelector(".stats-artist").textContent
        );
    }

    presenceData.smallImageKey = "play";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
