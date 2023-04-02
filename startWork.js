import fs from "fs";


let myMeaningsData = {};

joinJsonFiles('meanings1', 'meanings2')
function joinJsonFiles(file1, file2) {
  const data1 = JSON.parse(fs.readFileSync(`./meaningsJson/${file1}.json`)).data;
  const data2 = JSON.parse(fs.readFileSync(`./meaningsJson/${file2}.json`)).data;
  wf('./processed/meanings.json', {data:{...data1, ...data2}})
}

function wf(path, data) {
  fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) console.log(err, " is err");
    else {
      console.log(`wrote ${path} file successfully`);
    }
  });
}


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
