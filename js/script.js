/* =====================================
   GET LINKED ART DATA
===================================== */

async function getLinkedArt(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

/* =====================================
   GETTY API
===================================== */

async function processGettyData(
  gettyObj,
  connection,
  personalPhoto,
  photoCaption,
) {
  const gettyBase = "https://data.getty.edu/museum/collection/object/";
  const gettyUrl = gettyBase + gettyObj;

  const data = await getLinkedArt(gettyUrl);

  console.log(data);

  const imageUrl = data.representation[0].id;

  /* KASHMIR VALLEY */

  if (gettyObj === "acf92807-4f5a-48a2-9602-0d490dfda12f") {
    const title = data.identified_by[4].content;
    const artist = data.produced_by.carried_out_by[0]._label;

    makeImage(
      imageUrl,
      title,
      artist,
      "https://www.getty.edu/art/collection/object/108SM5",
      connection,
      gettyObj,
      personalPhoto,
      photoCaption,
    );
  }

  /* NATIVE OFFICE, PUNJAB IRREGULAR CAVALRY */

  if (gettyObj === "9e31c9b7-b32f-4300-a015-8be27480d935") {
    const title = data.identified_by[3].content;
    const artist = data.produced_by.carried_out_by[0]._label;

    makeImage(
      imageUrl,
      title,
      artist,
      "https://www.getty.edu/art/collection/object/109BE6",
      connection,
      gettyObj,
      personalPhoto,
      photoCaption,
    );
  }
}

/* =====================================
   RIJKSMUSEUM API
===================================== */

async function processRijksData(
  rijksObj,
  connection,
  personalPhoto,
  photoCaption,
) {
  const rijksBase = "https://id.rijksmuseum.nl/";
  const rijksUrl = rijksBase + rijksObj;

  const data = await getLinkedArt(rijksUrl);

  console.log(data);

  const imageUrl =
    data.subject_of[0].digitally_carried_by[0].access_point[0].id;

  /* BANYAN TREE */

  if (rijksObj === "200408302") {
    const title = data.identified_by[3].content;
    const artist = data.produced_by.part[1].referred_to_by[3].content;

    makeImage(
      imageUrl,
      title,
      artist,
      rijksUrl,
      connection,
      rijksObj,
      personalPhoto,
      photoCaption,
    );
  }

  /* WOMAN MAKING AN OFFERING TO SHIVA */

  if (rijksObj === "200412287") {
    const title =
      "Miniature Depicting a Woman Making an Offering to Shiva (Lingapuja)";

    const artist = data.produced_by.part[0].referred_to_by[1].content;

    makeImage(
      imageUrl,
      title,
      artist,
      rijksUrl,
      connection,
      rijksObj,
      personalPhoto,
      photoCaption,
    );
  }

  /* GOLDEN TEMPLE */

  if (rijksObj === "200499770") {
    const title = data.identified_by[2].content;
    const artist = data.produced_by.referred_to_by[1].content;

    makeImage(
      imageUrl,
      title,
      artist,
      rijksUrl,
      connection,
      rijksObj,
      personalPhoto,
      photoCaption,
    );
  }
}

/* =====================================
   CREATE ARTWORK IN DOM
===================================== */

function makeImage(
  imageUrl,
  title,
  artist,
  link,
  connection,
  objectId,
  personalPhoto,
  photoCaption,
) {
  const newCard = document.createElement("div");
  const newImage = document.createElement("img");
  const newTitle = document.createElement("h2");
  const newArtist = document.createElement("p");

  newCard.className = "card";
  newCard.dataset.objectId = objectId;

  newImage.src = imageUrl;
  newImage.alt = title;

  newTitle.textContent = title;
  newArtist.textContent = artist;

  newCard.appendChild(newImage);
  newCard.appendChild(newTitle);
  newCard.appendChild(newArtist);

  document.getElementById("main").appendChild(newCard);

  /* OPEN ARTWORK POPUP */

  newCard.addEventListener("click", function () {
    openPopup(
      imageUrl,
      title,
      artist,
      link,
      connection,
      personalPhoto,
      photoCaption,
    );
  });

  /* DRAW STRINGS AFTER IMAGE LOADS */

  newImage.addEventListener("load", drawStrings);
}

/* =====================================
   LOAD ARTWORKS AND CONNECTIONS
===================================== */

/* 1. KASHMIR VALLEY */

processGettyData(
  "acf92807-4f5a-48a2-9602-0d490dfda12f",

  "This photograph shows the Kashmir Valley, a place I visited myself. What caught my attention was how familiar the view looked. I remember stopping to take pictures of the same mountains and landscape. It made me wonder if I had stood in the exact same spot as the photographer, trying to capture the same view. We could have been looking at the same scenery decades apart without ever knowing it. I like the possibility that two people who have never met could share such a specific moment in completely different periods of time.",

  "images/kashmir-personal.JPG",

  "Kashmir Valley · Summer 2026",
);

/* 2. BANYAN TREE */

processRijksData(
  "200408302",

  "In Punjabi, we call the banyan tree bohar (ਬੋਹੜ). These trees are considered sacred and have historically been associated with sadhus (holy men) who practiced tapasya (meditation) beneath them. My dad told me that cutting one down could bring bad luck and that people would sometimes build around them instead. There's a very old banyan tree in my village where the sarpanch (village head) and other villagers used to hold meetings. My school also had an old banyan tree where my friends and I would play. Both looked almost exactly like the one in this artwork. It made me think about how I've encountered these trees in completely different parts of my life without ever paying much attention to the connection. I also wonder how many people have gathered beneath the tree in this artwork and whether their experiences were similar to mine, despite living in different places and times.",
);

/* 3. NATIVE OFFICE, PUNJAB IRREGULAR CAVALRY */

processGettyData(
  "9e31c9b7-b32f-4300-a015-8be27480d935",

  "I come from a family with a history of military service. Growing up, I listened to my grandfather's stories about war and the battles some of our family members fought in. He still wears his turban and uniform with pride. When I came across this photograph, I immediately thought of him. I don't know the man pictured here, but it made me wonder if our histories ever crossed. Maybe someone in my family served alongside one of them or knew someone who did. I'll probably never know but I like the idea that there could be a connection between this photograph and my family that I'm not aware of.",
);

/* 4. WOMAN MAKING AN OFFERING TO SHIVA */

processRijksData(
  "200412287",

  "This summer, we went exploring behind the place we were staying and came across a natural spring where local mountain communities collect water and pray because the site is considered sacred. There were carvings in the stone that had been there for centuries, and the place had been used for worship for just as long. When I came across this painting, I immediately thought of that place because of how similar they looked. It made me wonder how many people had visited the spring before us and whether someone centuries ago had stood in a similar place to the one depicted in this painting. I find it interesting that I came across this place by chance and later found an artwork that reminded me so much of it.",

  "images/spring-personal.jpg",

  "The natural spring · Summer 2026",
);

/* 5. GOLDEN TEMPLE */

processRijksData(
  "200499770",

  "I was born in Amritsar, Punjab, where the Golden Temple is located. It is one of the holiest places for Sikhs. In many families, visiting the Golden Temple after a wedding or the birth of a child is a tradition. This photograph was taken in 1895. Today, the temple is covered in gold and has beautiful ancient artwork and sacred scriptures inside still but the architecture around has changed. I've visited this place many times, but I've never really thought about how many generations have walked through the same space. It's interesting to see a photograph from over a century ago of a place that has been part of my life since I was born.",

  "images/golden-temple-personal.JPG",

  "The Golden Temple · Amritsar, Punjab",
);

/* =====================================
   OPEN POPUP
===================================== */

function openPopup(
  imageUrl,
  title,
  artist,
  link,
  connection,
  personalPhoto,
  photoCaption,
) {
  const popup = document.getElementById("popup");
  const notebook = document.getElementById("detail-body");
  const personalImage = document.getElementById("popup-personal-image");

  document.getElementById("popup-image").src = imageUrl;
  document.getElementById("popup-image").alt = title;

  document.getElementById("popup-title").textContent = title;
  document.getElementById("popup-artist").textContent = artist;
  document.getElementById("popup-story").textContent = connection;

  document.getElementById("popup-source-link").href = link;

  /* SHOW THIRD PAGE ONLY IF PERSONAL PHOTO EXISTS */

  if (personalPhoto) {
    notebook.classList.add("three-pages");

    personalImage.src = personalPhoto;
    personalImage.alt = "My photograph connected to " + title;

    document.getElementById("personal-photo-caption").textContent =
      photoCaption;
  } else {
    notebook.classList.remove("three-pages");

    personalImage.removeAttribute("src");
    personalImage.alt = "";

    document.getElementById("personal-photo-caption").textContent = "";
  }

  popup.style.display = "block";
  popup.scrollTop = 0;

  document.body.style.overflow = "hidden";
}

/* =====================================
   CLOSE POPUP
===================================== */

function closePopup() {
  document.getElementById("popup").style.display = "none";

  document.body.style.overflow = "";
}

document.getElementById("close-popup").addEventListener("click", closePopup);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePopup();
  }
});

/* =====================================
   DRAW RED STRINGS
===================================== */

function drawStrings() {
  const gallery = document.getElementById("gallery");
  const baby = document.getElementById("baby-photo");
  const svg = document.getElementById("strings");

  if (!gallery || !baby || !svg) {
    return;
  }

  svg.innerHTML = "";

  const galleryRect = gallery.getBoundingClientRect();
  const babyRect = baby.getBoundingClientRect();

  svg.setAttribute(
    "viewBox",
    "0 0 " + gallery.clientWidth + " " + gallery.clientHeight,
  );

  /* STRINGS START BEHIND BABY'S HEAD */

  const startX = babyRect.left - galleryRect.left + babyRect.width * 0.58;

  const startY = babyRect.top - galleryRect.top + babyRect.height * 0.17;

  /* FIND ALL ARTWORKS */

  const cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
    const rect = card.getBoundingClientRect();
    const id = card.dataset.objectId;

    const endX = rect.left - galleryRect.left + rect.width / 2;

    const endY = rect.top - galleryRect.top + rect.height;

    const dx = endX - startX;
    const dy = endY - startY;

    /* KASHMIR: KNOT 1 */

    if (id === "acf92807-4f5a-48a2-9602-0d490dfda12f") {
      drawThread(startX, startY, endX, endY, dx, dy, -95, true);
    }

    /* BANYAN TREE */

    if (id === "200408302") {
      drawThread(startX, startY, endX, endY, dx, dy, 100, false);
    }

    /* SOLDIER */

    if (id === "9e31c9b7-b32f-4300-a015-8be27480d935") {
      drawThread(startX, startY, endX, endY, dx, dy, -75, false);
    }

    /* SHIVA: KNOT 2 */

    if (id === "200412287") {
      drawThread(startX, startY, endX, endY, dx, dy, 80, true);
    }

    /* GOLDEN TEMPLE */

    if (id === "200499770") {
      drawThread(startX, startY, endX, endY, dx, dy, 55, false);
    }
  });
}

/* =====================================
   CREATE SVG THREAD
===================================== */

function drawThread(startX, startY, endX, endY, dx, dy, curve, knot) {
  const svg = document.getElementById("strings");

  const middleX = startX + dx * 0.5;
  const middleY = startY + dy * 0.5 + curve;

  const thread = document.createElementNS("http://www.w3.org/2000/svg", "path");

  /* STRING WITH KNOT */

  if (knot === true) {
    const pathData =
      "M " +
      startX +
      " " +
      startY +
      " Q " +
      (startX + dx * 0.25) +
      " " +
      (startY + dy * 0.3 + curve) +
      " " +
      middleX +
      " " +
      middleY +
      " c -18 -22, -25 18, 0 13" +
      " c 22 -5, 15 -30, 0 -13" +
      " Q " +
      (startX + dx * 0.75) +
      " " +
      (startY + dy * 0.7 + curve) +
      " " +
      endX +
      " " +
      endY;

    thread.setAttribute("d", pathData);
  }

  /* STRING WITHOUT KNOT */

  if (knot === false) {
    const pathData =
      "M " +
      startX +
      " " +
      startY +
      " Q " +
      middleX +
      " " +
      middleY +
      " " +
      endX +
      " " +
      endY;

    thread.setAttribute("d", pathData);
  }

  thread.setAttribute("class", "thread");

  svg.appendChild(thread);
}

/* =====================================
   UPDATE STRINGS
===================================== */

window.addEventListener("resize", drawStrings);
window.addEventListener("load", drawStrings);
