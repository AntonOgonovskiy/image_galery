const search = document.querySelector(".search");
const closeSearch = document.querySelector(".search-reset");
const getSearch = document.querySelector(".search-icon");
const imagenarium = document.querySelector(".main-wrapper")
const image = document.querySelector(".img-content")
let url = 'https://api.unsplash.com/search/photos?query=random&tag_mode=all&per_page=24&orientation=landscape&client_id=_H2ymhk-TT4WrYkc8mIhfTyBmawxy0EMgkqiNC-JvyQ';

/*   --- functions ---   */

function closer() {
	if (search.value.length > 0) {
		closeSearch.classList.remove('none')
	}
	else {
		closeSearch.classList.add('none')
	}
}

function resetSearch() {
	search.value = '';
	search.focus();
	closeSearch.classList.add('none')
}

async function getData() {
	const res = await fetch(url);
	const data = await res.json();
	function showData() {
		data.results.map((item) => {
			let path = item.urls.regular
			const img = document.createElement('img');
			img.classList.add('img-content')
			img.src = path;
			img.alt = 'here can be your image';
			imagenarium.append(img)
		});
	}
	showData(data)
}

function letSearch() {
	if (imagenarium.hasChildNodes()) {
		imagenarium.innerHTML = ''
	}
	url = `https://api.unsplash.com/search/photos?query=${search.value}&tag_mode=all&per_page=24&orientation=landscape&client_id=_H2ymhk-TT4WrYkc8mIhfTyBmawxy0EMgkqiNC-JvyQ`;
	getData()
}

function openImg(event) {
	if (event.target.classList.contains('img-content')) {
		window.open(event.target.src)
	}
}

search.addEventListener('keyup', closer)
getSearch.addEventListener('click', letSearch)
closeSearch.addEventListener('click', resetSearch)
window.addEventListener('load', getData)
imagenarium.addEventListener('click', openImg)
document.addEventListener('keydown', () => {
	if (event.code === 'Enter') {
		letSearch()
		search.blur();
	}
})





