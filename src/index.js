//*Tester
console.log("%c HI", "color: firebrick");
//*APIs
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
//* DOM elements
const dogImageContainer = document.querySelector("#dog-image-container");
const breedContainer = document.querySelector("#dog-breeds");
const dropdown = document.querySelector("select#breed-dropdown");

//TODO Fetch all dog images
fetch(imgUrl)
	.then((resp) => resp.json())
	.then((dogData) => {
		dogData.message.forEach((url) => {
			const img = document.createElement("IMG");
			img.src = url;
			dogImageContainer.append(img);
		});
	});

//TODO Fetch all dog breeds
fetch(breedUrl)
	.then((resp) => resp.json())
	.then((breedData) => {
		//* Here we see that the API returns an object "Message", which has breeds who are keys of the object
		//* To access keys inside an Object, we can use "for ..in" and "Object.keys method"
		const breedArray = Object.keys(breedData.message);
		//* Iterate over array of all breeds and create list of breeds
		breedArray.forEach((breed) => {
			const li = document.createElement("Li");
			li.textContent = breed;
			breedContainer.append(li);
		});
	});

//TODO Change font color of li on click
//*Delegation Method: Add one event listener to common parent element
breedContainer.addEventListener("click", (event) => {
	if (event.target.tagName === "LI") {
		event.target.style.color = "red";
	}
});

/**Individual Event Listener method: Add event listener to "li" tag upon inception in fetch request
 * Pass event argument to change color "li.style.color = "red"
 * Don't need to use "event.target if nested inside of a function"
 * Event delegation is preferred to avoid nested function issues
 */

//TODO User should be able to filter dog breeds
//*Add event listener select#breed dropdown menu
dropdown.addEventListener("change", (event) => {
	const breedLetter = event.target.value;
	const breedList = breedContainer.querySelectorAll("li");
	breedList.forEach((li) => {
		if (li.textContent[0] === breedLetter) {
			li.style.display = ""; //*Display matched results
		} else {
			li.style.display = "none"; //* Don't display unmatched results
		}
	});
});
