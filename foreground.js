let upper = document.querySelectorAll(
  "body > table > tbody > tr:nth-child(3) > td > table > tbody > tr"
);

try {
  good = new Array(upper[1].children.length).fill(false);
} catch (error) {}

upper.forEach((element, index) => {
  for (let n = 1; n < element.children.length; n++)
    if (element.children[n].innerText == ".") good[n] = true;
});

curTar = { bgColor: null };

const getTitleElement = () => {
  return document.querySelector("p");
};

const getPageInfoElement = () => {
  return document.querySelector(
    "body > table > tbody > tr:nth-child(2) > td > table"
  );
};

const getGenerated = () => {
  return getPageInfoElement().querySelector("tbody > tr > td:nth-child(2)")
    .innerHTML;
};

const getTestCutoff = () => {
  return getPageInfoElement().querySelector(
    "tbody > tr:nth-child(2) > td:nth-child(2)"
  ).innerHTML;
};

const getCodeCutoff = () => {
  return getPageInfoElement().querySelector(
    "tbody > tr:nth-child(3) > td:nth-child(2)"
  ).innerHTML;
};

const parseAssignmentTitle = (title) => {
  const tokens = title.split("_");
  return {
    course: tokens[0],
    term: tokens[1],
    assignment: tokens[2],
  };
};

const makePrettyTable = (table) => {
  table.classList.add("table");
  table.classList.add("table-striped");
};

let env = null;

const loadEnv = () => {
  try {
    makePrettyTable(
      document.querySelector("table > tbody > tr:nth-child(3) > td > table")
    );
    env = {
      assignmentInfo: parseAssignmentTitle(getTitleElement().innerHTML),
      pageInfo: {
        generated: getGenerated(),
        testCutoff: getTestCutoff(),
        codeCutoff: getCodeCutoff(),
      },
      contentTable: document.querySelector(
        "table > tbody > tr:nth-child(3) > td > table"
      ).outerHTML,
    };
  } catch (error) {}
};

const putContainer = (element) => {
  const children = element.childNodes;
  const container = document.createElement("div");
  container.classList.add("container");
  children.forEach((element) => container.appendChild(element));
  element.innerHTML = "";
  element.appendChild(container);
};

const ContentCard = (innerHTML) => {
  return `
    <div class="card mt-4">
      <div id="content-card" style="overflow: scroll" class="card-body">
        ${innerHTML}
      </div>
    </div>
  `;
};

const removeOldContent = () => {
  const oldTable = document.querySelector("table");
  document.querySelector("div.container").removeChild(oldTable);
};

const InfoCard = () => {
  return `
    <div class="card mt-4" style="width: 100%;">
      <div class="card-body">
        <h5 class="card-title">Assignment ${env.assignmentInfo.assignment}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Course: ${env.assignmentInfo.course} | Term: ${env.assignmentInfo.term}</h6>
        <hr />
        <h6 class="card-subtitle mb-2 text-muted">Generated: ${env.pageInfo.generated}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Tests cutoff: ${env.pageInfo.testCutoff}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Code cutoff: ${env.pageInfo.codeCutoff}</h6>

      </div>
    </div>
  `;
};

const loadPage = () => {
  loadEnv();
  document.querySelector("body").style.backgroundColor = "#f5f5f5";
  putContainer(document.querySelector("body"));
  document.querySelector("div.container").innerHTML =
    InfoCard() + document.querySelector("div.container").innerHTML;
  document.querySelector("div.container").innerHTML += ContentCard(
    env.contentTable
  );
  removeOldContent();

  const contentCard = document.querySelector("#content-card");

  upper = contentCard.querySelectorAll("table > tbody > tr");

  contentCard.querySelectorAll("table > tbody > tr").forEach((tr, index) => {
    if (tr.style.backgroundColor == "yellow") {
      tr.children[0].innerHTML = "*** Professor Solution ***";
    }
    tr.classList.add("text-center");
    tr.children[0].style.textAlign = "left";
    if (index > 2) {
      console.log(tr);
      for (i = 1; i < tr.children.length; i++) {
        if (tr.children[i].children[0].innerHTML == ".") {
          tr.children[i].children[0].style.color = "#41cc00";
          tr.children[i].children[0].classList.add("grow");
          tr.children[i].children[0].innerHTML = "✔";
        } else {
          tr.children[i].children[0].classList.add("grow");
          tr.children[i].children[0].innerHTML = "✘";
        }
      }
    }

    tr.addEventListener("click", (el) => {
      curTar.bgColor = "";
      curTar = el.currentTarget;
      curTar.bgColor = "#ffa500";
      for (i = 1; i < curTar.children.length; i++) {
        setTo = curTar.children[i].innerText == "✘" && good[i] ? "#ffa500" : "";
        upper[0].children[i].style.backgroundColor = setTo;
        upper[1].children[i].style.backgroundColor = setTo;
        upper[2].children[i].style.backgroundColor = setTo;
      }
    });
  });
};

try {
  loadPage();
} catch (error) {
  console.log("page already loaded");
}