var fundo = document.getElementsByClassName('container');
var frase = document.getElementsByClassName('frase');
var autor = document.getElementsByClassName('autor');
var newQuote = document.getElementsByClassName('nQuote');
var tweet = document.getElementsByClassName('tweet');
var quote = document.getElementsByClassName('quote');

var div = 0;

var cores = [
	'#97964E',
	'#755864',
	'#396F82',
	'#D19BC9',
	'#473DB2',
	'#510606',
	'#694',
	'#f00',
	'#E69142',
	'#f0f',
	'#f76',
	'#157',
	'#8b4513',
	'#B1464E'
];
var usadas = [];

function addCor() {
	const index = Math.round(Math.random() * (cores.length - 1));

	fundo.item(div).style.backgroundColor = cores[index];
	frase.item(div).style.color = cores[index];
	autor.item(div).style.color = cores[index];
	newQuote.item(div).style.backgroundColor = cores[index];
	tweet.item(div).style.backgroundColor = cores[index];
	quote.item(div).style.color = cores[index];

	usadas.push(cores[index]);
	cores.splice(index, 1);

	if (cores.length === 0) {
		cores = usadas;
		usadas = [];
	}
}

let initObject = {
	method: 'GET'
};

const endpoint = new Request(
	'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
	initObject
);

function getQuote() {
	fetch(endpoint)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			const index = Math.round(Math.random() * (data.quotes.length - 1));
			displayQuote(data.quotes[index].quote, data.quotes[index].author);
		})
		.catch(function(err) {
			console.log('Something went wrong!', err);
		});
}

function displayQuote(quote, author) {
	const quoteText = document.getElementById('text');
	quoteText.textContent = quote;

	const authorQuote = document.getElementById('author');
	authorQuote.textContent = author;

	const tweetButton = document.querySelector('.tweet');
	tweetButton.setAttribute('href', `https://twitter.com/intent/tweet?text=${quote}`);
}

const newQuoteButton = document.getElementById('new-quote');
newQuoteButton.addEventListener('click', getQuote);
