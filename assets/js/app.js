const cl = console.log;

const form = document.getElementById("form");
const stdContainer = document.getElementById("stdContainer");
const fnameControl = document.getElementById("fname");
const lnameControl = document.getElementById("lname");
const contactControl = document.getElementById("contact");
const emailControl = document.getElementById("email");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");

// DataBase

let stdArr = [
  {
    id: "112",
    fname: "Rahul",
    lname: "Patil",
    contact: 4455444488,
    email: "rahul@gmail.com",
  },
  {
    id: "112",
    fname: "Mahesh",
    lname: "Barbade",
    contact: 8838485832,
    email: "mahesh@gmail.com",
  },
];
// Functions

// ShowOnUI

function showOnUI(arr) {
  let result = "";

  arr.forEach((ele, i) => {
    result += `
                                    <tr id=${ele.id}>
                                    <td>${i + 1}</td>
                                    <td>${ele.fname}</td>
                                    <td>${ele.lname}</td>
                                    <td>${ele.contact}</td>
                                    <td>${ele.email}</td>
                                    <td><i <i onclick = "editStd(this)" data-edit-id = ${ele.id} class="fa-solid fa-pen-to-square fa-2x text-primary" role="button"></i></td>
                                    <td><i onclick = "removeStd(this)" data-remove-id = ${ele.id} class="fa-solid fa-trash-can fa-2x text-danger" role="button" ></i></td>
                                </tr> `;
  });

  stdContainer.innerHTML = result;
}

showOnUI(stdArr);

// Create Tr

function createTr(obj) {
  let tr = document.createElement("tr");

  tr.id = obj.id;

  tr.innerHTML = `
                                    <td>${stdArr.length}</td>
                                    <td>${obj.fname}</td>
                                    <td>${obj.lname}</td>
                                    <td>${obj.contact}</td>
                                    <td>${obj.email}</td>
                                    <td><i onclick = "editStd(this)" data-edit-id = ${tr.id} class="fa-solid fa-pen-to-square fa-2x text-primary" role="button"></i></td>
                                    <td><i onclick = "removeStd(this)" data-remove-id = ${tr.id} class="fa-solid fa-trash-can fa-2x text-danger" role="button"></i></td>
    `;

  stdContainer.append(tr);

  Swal.fire({
    title: "Student Created Successfully!",
    text: `Your Student Information is Created Successfully with id ${tr.id}`,
    icon: "success",
    timer: 1500,
  });
}

// Editing Student

function editStd(ele) {
  let editId = ele.dataset.editId;

  let editObj = stdArr.find((ele) => ele.id === editId);

  fnameControl.value = editObj.fname;
  lnameControl.value = editObj.lname;
  contactControl.value = editObj.contact;
  emailControl.value = editObj.email;

  submitBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  updateBtn.setAttribute("data-edit-id", editId);
}

// Updating Student

function onStdUpdated(event) {
  let updateId = event.target.dataset.editId;

  let updatedObj = {
    id: updateId,
    fname: fnameControl.value,
    lname: lnameControl.value,
    contact: contactControl.value,
    email: emailControl.value,
  };

  let getIndex = stdArr.findIndex((ele) => ele.id === updateId);

  stdArr[getIndex] = updatedObj;

  let td = [...document.getElementById(updateId).children];

  td[1].innerText = fnameControl.value;
  td[2].innerText = lnameControl.value;
  td[3].innerText = contactControl.value;
  td[4].innerText = emailControl.value;

  updateBtn.classList.add("d-none");
  submitBtn.classList.remove("d-none");
  form.reset();

  Swal.fire({
    title: "Student Updated Successfully!",
    text: `Your Student Information is Updated Successfully with id ${updateId}`,
    icon: "success",
    timer: 1500,
  });
}

// Removing Student

function removeStd(ele) {
  let removeId = ele.dataset.removeId;

  let getConfirmed = confirm(
    `Are you sure you want to delete this student Information?`,
  );

  if (getConfirmed) {
    let getIndex = stdArr.findIndex((ele) => ele.id === removeId);

    stdArr.splice(getIndex, 1);

    document.getElementById(removeId).remove();

    let srno = [
      ...document.querySelectorAll("#stdContainer tr td:first-child"),
    ];

    srno.forEach((ele, i) => (ele.innerText = i + 1));

    Swal.fire({
      title: "Student Deleted Successfully!",
      text: `Your Student Information is Deleted Successfully with id ${removeId}`,
      icon: "success",
      timer: 1500,
    });
  }
}

function onStdAdd(event) {
  event.preventDefault();

  let obj = {
    id: crypto.randomUUID(),
    fname: fnameControl.value,
    lname: lnameControl.value,
    contact: contactControl.value,
    email: emailControl.value,
  };

  stdArr.push(obj);

  createTr(obj);

  form.reset();
}

form.addEventListener("submit", onStdAdd);
updateBtn.addEventListener("click", onStdUpdated);
