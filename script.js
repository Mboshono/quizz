
function calculateFinalMarkAndGrade(caMark, examMark) {
    const finalMark = (caMark + examMark) / 2;
    let grade = '';

    if (finalMark >= 90) {
        grade = 'A+';
    } else if (finalMark >= 80) {
        grade = 'A';
    } else if (finalMark >= 70) {
        grade = 'B';
    } else if (finalMark >= 60) {
        grade = 'C';
    } else if (finalMark >= 50) {
        grade = 'D';
    } else {
        grade = 'F';
    }

    return { finalMark, grade };
}


let students = JSON.parse(localStorage.getItem('students')) || [];


function addStudentRow(student) {
    const tableBody = document.getElementById('StudentsFinalMarks');
    const newRow = tableBody.insertRow(-1);

    const studentNumberCell = newRow.insertCell(0);
    studentNumberCell.textContent = student.studentNumber;

    const fullNameCell = newRow.insertCell(1);
    fullNameCell.textContent = student.fullName;

    const caMarkCell = newRow.insertCell(2);
    const caMarkInput = document.createElement('input');
    caMarkInput.type = 'number';
    caMarkInput.value = student.caMark || '';
    caMarkInput.addEventListener('input', () => {
        const examMarkInput = newRow.cells[3].querySelector('input');
        const { finalMark, grade } = calculateFinalMarkAndGrade(
            parseFloat(caMarkInput.value),
            parseFloat(examMarkInput.value)
        );
        newRow.cells[4].textContent = finalMark.toFixed(2);
        newRow.cells[5].textContent = grade;
        student.caMark = parseFloat(caMarkInput.value);
        student.finalMark = finalMark;
        student.grade = grade;
        localStorage.setItem('students', JSON.stringify(students));
    });
    caMarkCell.appendChild(caMarkInput);

    const examMarkCell = newRow.insertCell(3);
    const examMarkInput = document.createElement('input');
    examMarkInput.type = 'number';
    examMarkInput.value = student.examMark || '';
    examMarkInput.addEventListener('input', () => {
        const caMarkInput = newRow.cells[2].querySelector('input');
        const { finalMark, grade } = calculateFinalMarkAndGrade(
            parseFloat(caMarkInput.value),
            parseFloat(examMarkInput.value)
        );
        newRow.cells[4].textContent = finalMark.toFixed(2);
        newRow.cells[5].textContent = grade;
        student.examMark = parseFloat(examMarkInput.value);
        student.finalMark = finalMark;
        student.grade = grade;
        localStorage.setItem('students', JSON.stringify(students));
    });
    examMarkCell.appendChild(examMarkInput);

    const finalMarkCell = newRow.insertCell(4);
    finalMarkCell.textContent = student.finalMark ? student.finalMark.toFixed(2) : '';

    const gradeCell = newRow.insertCell(5);
    gradeCell.textContent = student.grade || '';
}


students.forEach(student => {
    addStudentRow(student);
});


function addStudent(studentNumber, fullName) {
    const student = {
        studentNumber,
        fullName,
        caMark: null,
        examMark: null,
        finalMark: null,
        grade: ''
    };

    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    addStudentRow(student);
}


addStudent("218218960", "Sylvia Tuhafeni");
addStudent("218218575", "Evarist Shaama");
addStudent("210213455", "Johannes Ndjimba");
addStudent("214624657", "Anna Matheus");
addStudent("210213455", "Shiwa Simon");

