document.addEventListener('DOMContentLoaded', function() {
    const topics = document.querySelectorAll('.sidebar ul li');
    const infoDisplay = document.getElementById('infoDisplay');
    const teacherForm = document.getElementById('teacherForm');
    const studentForm = document.getElementById('studentForm');
    const questionContainer = document.getElementById('questionContainer');
    const questionText = document.getElementById('questionText');
    const answerForm = document.getElementById('answerQuestionForm');
    const studentAnswerInput = document.getElementById('studentAnswer');

    topics.forEach(topic => {
        topic.addEventListener('click', function() {
            const topicName = this.getAttribute('data-topic');
            showInfo(topicName);
        });
    });

    teacherForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const questionInput = document.getElementById('question');
        const answerInput = document.getElementById('answer');
        const question = questionInput.value.trim();
        const answer = answerInput.value.trim();

        if (question && answer) {
            addQuestionToDB(question, answer);
            questionInput.value = '';
            answerInput.value = '';
        } else {
            alert('Please enter both question and answer.');
        }
    });

    answerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const studentAnswer = studentAnswerInput.value.trim();
        const correctAnswer = question.correctAnswer; // Assuming you have a way to track the correct answer

        if (studentAnswer === correctAnswer) {
            alert('Correct answer!');
            // Handle correct answer logic
        } else {
            alert('Incorrect answer. Try again.');
            // Handle incorrect answer logic
        }
    });

    function showInfo(topic) {
        let info;

        switch (topic) {
            case 'go':
                info = "Go is a statically typed, compiled programming language designed for building simple, efficient, and reliable software.";
                break;
            case 'php':
                info = "PHP is a widely-used open source scripting language that is especially suited for web development and can be embedded into HTML.";
                break;
            case 'questions':
                info = "This section is for creating and managing quiz questions. Functionality for this feature will be implemented separately.";
                break;
            default:
                info = 'Click on a topic to see information here.';
        }

        infoDisplay.innerHTML = info;

        if (topic !== 'questions') {
            questionContainer.style.display = 'none';
            studentForm.style.display = 'none';
            teacherForm.style.display = 'block';
        } else {
            questionContainer.style.display = 'block';
            studentForm.style.display = 'block';
            teacherForm.style.display = 'none';
        }
    }

    function addQuestionToDB(question, answer) {
        const formData = {
            question: question,
            answer: answer
        };

        fetch('http://localhost:3001/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add question. Please try again.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Question added successfully:', data);
            // Optionally update UI or perform further actions
        })
        .catch(error => {
            console.error('Error adding question:', error);
            alert('Failed to add question. Please try again.');
        });
    }
});
