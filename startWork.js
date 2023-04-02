import fs from "fs";

let alphabets = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

let myMeaningsData = {};

function reWriteJson(filePre) {
  const json = fs.readFileSync(`./meaningsJson/${filePre}.json`);
  const data = JSON.parse(json);
  console.log("working on letter " + filePre);
  var newJsonData = [];
  function getMeanings() {
    let keyWord = Object.keys(data);
    console.time(filePre);
    for (let i = 0; i < keyWord.length; i++) {
      let key = keyWord[i];
      let keyObj = data[keyWord[i]];
      var obj = {};
      obj[key] = {
        WORD: key,
        MEANINGS: [],
        ANTONYMS: keyObj.ANTONYMS,
        SYNONYMS: keyObj.SYNONYMS,
      };
      var mean = keyObj.MEANINGS;
      for (const property in mean) {
        let objArr = Array.from(mean[property]);
        let myObjNow = {
          partsOfSpeech: objArr[0],
          definition: objArr[1],
          relatedWords: objArr[2],
          exampleSentence: objArr[3],
        };
        let meaningsObj = obj[key].MEANINGS;
        meaningsObj.push(myObjNow);
      }
      newJsonData = { ...newJsonData, ...obj };
    }
    console.timeEnd(filePre);
    myMeaningsData = { ...myMeaningsData, ...newJsonData };
  }
  getMeanings();
}

function wf(path, data) {
  fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) console.log(err, " is err");
    else {
      console.log(`wrote ${path} file successfully`);
    }
  });
}

fs.open("./processed/meanings.json", "r", function (err, fd) {
  if (err) {
    for (let letter of alphabets) {
      reWriteJson(letter);
      const prom = new Promise((resolve, reject) => {
        if (letter == "z") {
          setTimeout(() => {
            resolve(26);
          }, 3000);
        }
      });
      prom.then(() =>
        wf("./processed/meanings.json", { data: myMeaningsData })
      );
    }
  } else {
    console.log("The meanings.json file already exists!");
  }
});

fs.open("./processed/queries.json", "r", function (err, fd) {
  if (err) {
    wf("./processed/queries.json", { data: [] });
  } else {
    console.log("queries.json file already exists");
  }
});

fs.open("./processed/admin.json", "r", function (err, fd) {
  if (err) {
    wf("./processed/admin.json", {
      data: {
        name: "admin",
        password: "admin",
        security: false,
        loggedIn: false,
      },
    });
  } else {
    console.log("admin.json file already exists");
  }
});

fs.mkdir("./processed", { recursive: true }, (err) => {
  if (err) {
    console.log(err, "err making dir");
    return;
  } else {
    console.log("./processed/ folder created");
  }
});
