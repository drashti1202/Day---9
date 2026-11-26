
let employees = [];

const form = document.getElementById("employeeForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value;
    const salary = Number(document.getElementById("salary").value);

    const errorMessage = document.getElementById("errorMessage");

    if (name === "") {
        errorMessage.textContent = "Please enter employee name.";
        return;
    }

    if (email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMessage.textContent = "Please enter a valid email.";
        return;
    }

    if (department === "") {
        errorMessage.textContent = "Please select a department.";
        return;
    }

    if (salary <= 0 || !Number.isFinite(salary)) {
        errorMessage.textContent = "Salary must be greater than 0.";
        return;
    }

    const employee = {
        name: name,
        email: email,
        department: department,
        salary: salary
    };

    employees.push(employee);

    errorMessage.textContent = "";

    form.reset();

    displayEmployees();

});

function displayEmployees() {

    const employeeList = document.getElementById("employeeList");

    employeeList.innerHTML = "";

    if (employees.length === 0) {
        employeeList.textContent = "No employees registered yet.";
    }

    employees.forEach(function(employee, index) {

        const card = document.createElement("div");

        card.className = "employee-card";

        const heading = document.createElement("h3");
        heading.textContent = employee.name;

        const email = document.createElement("p");
        email.textContent = "Email: " + employee.email;

        const department = document.createElement("p");
        department.textContent = "Department: " + employee.department;

        const salary = document.createElement("p");
        salary.textContent = "Salary: ₹" + employee.salary.toLocaleString("en-IN");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            employees.splice(index, 1);
            displayEmployees();
        });

        card.appendChild(heading);
        card.appendChild(email);
        card.appendChild(department);
        card.appendChild(salary);
        card.appendChild(deleteButton);

        employeeList.appendChild(card);

    });

    updateStatistics();

}

function updateStatistics() {

    const total = employees.length;

    const totalSalary = employees.reduce(function(sum, employee) {
        return sum + employee.salary;
    }, 0);

    const average = total === 0 ? 0 : totalSalary / total;

    const highest = total === 0
        ? 0
        : Math.max(...employees.map(employee => employee.salary));

    document.getElementById("totalEmployees").textContent = total;

    document.getElementById("averageSalary").textContent =
        "₹" + average.toLocaleString("en-IN", {
            maximumFractionDigits: 2
        });

    document.getElementById("highestSalary").textContent =
        "₹" + highest.toLocaleString("en-IN");

}
