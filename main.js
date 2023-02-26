
const form = document.querySelector(".box");
const answers = Array.from(document.querySelectorAll(".answer"));
const allQuestions = document.querySelectorAll(".question");
let x = 0;
let y = 0;
let summary = false;


const warning = document.querySelector(".warning");
const warningInfo = warning.querySelector("p");
const warningButton = warning.querySelector(".close-warning");

const handleQuiz = (e) => {
	e.preventDefault();



	if (sessionStorage.getItem("poprawne") != undefined) {
		x = sessionStorage.getItem("poprawne")

	}
	if (sessionStorage.getItem("niepoprawne") != undefined) {
		y = sessionStorage.getItem("niepoprawne")

	}

	const checkedAnswers = answers.filter((answer) => answer.checked);

	const isTrue = checkedAnswers.every((answer) => answer.value === "true");

	const allChecked = checkedAnswers.length === allQuestions.length;

	if (!allChecked) {
		warning.classList.add("warning-active");
		warningInfo.textContent = "Musisz zaznaczyć wszystkie odpowiedzi !";
		return
	}


	if (!summary) {

		checkedAnswers.forEach((answer) => {
			const checkIfcorrect = answer.value === "true";
			console.log(checkIfcorrect);

			const boxAnswer = answer.closest(".box-answer");

			if (checkIfcorrect) {
				boxAnswer.classList.add("correct");
				boxAnswer.classList.remove("incorrect");
				x = Number(x) + 1;
			} else {
				boxAnswer.classList.add("incorrect");
				boxAnswer.classList.remove("correct");
				y = Number(y) + 1;
			}
		});
		summary = true;
	}
	sessionStorage.setItem("poprawne", x)
	sessionStorage.setItem("niepoprawne", y)

	if (isTrue && allChecked) {
		warning.classList.add("warning-active");
		warningInfo.textContent = "Brawo wszystkie odpowiedzi są poprawne !  " + " Liczba poprawnych odpowiedzi: " + x;
	} else {
		warning.classList.add("warning-active");
		warningInfo.textContent = "Liczba poprawnych odpowiedzi: " + x + " liczba złych odpowiedzi: " + y;

	}


};

const closeWarning = () => {
	warning.classList.remove("warning-active");
};

warningButton.addEventListener("click", closeWarning);
form.addEventListener("submit", handleQuiz);
