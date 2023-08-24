/* 
Exercise Fetch API:
make a HTTP request to: https://reqres.in/api/users?delay=3
get the data and tabulate it
*/

//getting data with Fetch
const getTable = async (url = "https://reqres.in/api/users?delay=3") => {
  const responseJSON = await fetch(url); //get the data in JSON
  const response = await responseJSON.json(); //parse the response into object
  console.log(`getting data with Fetch`);
  console.log(response);
  return response;
};

//storing data in localStorage
const saveInLocalStorage = async ({ data }) => {
  console.log(`saving data in localStorage`);
  console.log(data);
  console.log(typeof data);
  //data is an array of objects
  //getting every object
  data.forEach((element) => {
    // console.log(element);
    // const { id, ...rest } = element; //destructuring an object, we want id as a key
    const { id } = element; //destructuring an object, we want id as a key
    //the key of the object is the id, and the value is the rest of the object
    localStorage.setItem(id, JSON.stringify(element));
  });
  console.log(`data is saved in localStorage`);
  return new Date().getTime();
};

//getting data from localStorage222
const getFromLocalStorage = async () => {
  console.log(`getting data from localStorage`);
  const dataLocalStorage = []; //array to save every object
  //   console.log(`dataLocalStorage typeof: ${typeof dataLocalStorage}`);
  //   console.log(typeof localStorage);
  //getting all keys from localStorage as an array
  const keysLocalStorage = Object.keys(localStorage).sort();
  console.log(keysLocalStorage);

  keysLocalStorage.forEach((key) => {
    //   console.log(`key: ${key} typeof ${typeof key}`);
    // const newElement = localStorage.getItem(key);
    //   console.log(`newElement: ${newElement}`);
    // const toObject = JSON.parse(newElement);
    //   console.log(`newElement: ${toObject}`);
    // const toObject = await localStorage.getItem(key).json();
    // dataLocalStorage.push(toObject);

    // dataLocalStorage.push(JSON.parse(localStorage.getItem(key)));
    dataLocalStorage.push(localStorage.getItem(key));
  });
  //   for (let i = 1; i <= localStorage.length; i++) {
  //     console.log(JSON.parse(localStorage.getItem(i.toString())));
  //     dataLocalStorage[i - 1] = JSON.parse(localStorage.getItem(i.toString()));
  //   }
  //   console.log(JSON.parse(localStorage.getItem("1")));

  //   const elementLS = JSON.parse(JSON.stringify(localStorage.getItem("1")));
  //   console.log(elementLS);
  //   dataLocalStorage.push(elementLS);
  //   const dataLocalStorage = JSON.parse(localStorage.getItem(id));
  // console.log(`dataLocalStorage: ${dataLocalStorage}`);
  //   console.log(`dataLocalStorage typeof: ${typeof dataLocalStorage}`);
  //   console.log(`dataLocalStorage: ${dataLocalStorage[0]}`);
  //   console.log(`dataLocalStorage typeof: ${typeof dataLocalStorage[0]}`);
  return dataLocalStorage;
};

const lifeSpan = (getBtnClicked, localStorageCreated) => {
  return Math.floor((getBtnClicked - localStorageCreated) / 1000);
};

//html elements:
const getDataForm = document.forms["get-data-form"];
const lifeSpanSeconds = 10;
getDataForm.addEventListener("click", async (event) => {
  event.preventDefault(); //prevents default refresh
  const getDataBtnClicked = new Date().getTime(); //gets time in ms when i
  spanDifference = lifeSpan(getDataBtnClicked, localStorageSaved); //gets span when it's saved
  console.log(`spanDifference=getDataBtnClicked-localStorageSaved
  ${getDataBtnClicked}-${localStorageSaved}=${spanDifference}`);
  if (localStorage.length === 0 || spanDifference >= lifeSpanSeconds) {
    //first time, it requests the data from reqres
    //and saves it in localStorage,
    //likewise if its lifespan has exceeded 60 seconds
    console.log(`first time or lifetime exceeded`);
    const data = await getTable(); //gets data
    localStorageSaved = await saveInLocalStorage(data); //saves data in localStorage and returns the date of creation
    //print the data
    createBody(JSON.stringify(data));
  } else {
    console.log(`lifespan is still valid`);
    const users = await getFromLocalStorage();
    // print the data
    // createTable(users);
    createBody(users);
  }
});

//Initiate a asynchronous date at the start of the application
const start = async () => {
  return (localStorageSaved = new Date().getTime());
};
start();

// insert rows
const createRow = (users) => {
  return (getusers = users.map((user) => {
    const usertoObject = JSON.parse(user);
    const { id, email, first_name, last_name, avatar } = usertoObject;
    // console.log(usertoObject);
    return `<tr>
    <th scope="row">${id}</th>
    <td>${first_name}</td>
    <td>${last_name}</td>
    <td>${email}</td>
    <td><img src="${avatar}" class="rounded-circle"></td>
    </tr>`;
  }));
};
const createHead = (users) => {
  const usertoObject = JSON.parse(users[0]);
  const arrayKeys = Object.keys(usertoObject);
  // console.log(Object.keys(usertoObject));
  // const [id, email, first_name, last_name, avatar] = arrayKeys;
  return `<thead class="table-light">
      <tr>
      <th scope="col">${arrayKeys[0]}</th>
      <th scope="col">${arrayKeys[2]}</th>
      <th scope="col">${arrayKeys[3]}</th>
      <th scope="col">${arrayKeys[1]}</th>
      <th scope="col">Image</th>
      </tr>
      </thead>`;
};
const createBody = (users) => {
  const table = document.getElementById("table");
  const head = createHead(users);
  const rows = `<tbody>${createRow(users).join("")}</tbody>`;
  table.innerHTML = head + rows;
};

const createUsersRequest = async (users) => {};
