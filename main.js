const form = document.querySelector(".box");
const answers = Array.from(document.querySelectorAll(".answer"));
const allQuestions = document.querySelectorAll(".question");

const warning = document.querySelector(".warning");
const warningInfo = warning.querySelector("p");
const warningButton = warning.querySelector(".close-warning");

const handleQuiz = (e) => {
	e.preventDefault();

	const checkedAnswers = answers.filter((answer) => answer.checked);

	const isTrue = checkedAnswers.every((answer) => answer.value === "true");

	const allChecked = checkedAnswers.length === allQuestions.length;

	if (!allChecked) {
		warning.classList.add("warning-active");
		warningInfo.textContent = "Wybierz wszystkie odpowiedzi !";
		return
	}

	checkedAnswers.forEach((answer) => {
		const checkIfcorrect = answer.value === "true";
		console.log(checkIfcorrect);

		const boxAnswer = answer.closest(".box-answer");

		if (checkIfcorrect) {
			boxAnswer.classList.add("correct");
			boxAnswer.classList.remove("incorrect");
		} else {
			boxAnswer.classList.add("incorrect");
			boxAnswer.classList.remove("correct");
		}
	});

	if (isTrue && allChecked) {
		warning.classList.add("warning-active");
		warningInfo.textContent = "Brawo wszystkie odpowiedzi są poprawne !";
	} else {
		warning.classList.add("warning-active");
		warningInfo.textContent = "Niestety nie wszystkie odpowiedzi są poprawne ";
	}
};

const closeWarning = () => {
	warning.classList.remove("warning-active");
};

warningButton.addEventListener("click", closeWarning);
form.addEventListener("submit", handleQuiz);
