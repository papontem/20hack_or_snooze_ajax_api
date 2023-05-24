"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */
async function getAndShowStoriesOnStart() {
	storyList = await StoryList.getStories();
	$storiesLoadingMsg.remove();

	putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */
function generateStoryMarkup(story) {
	// console.debug("generateStoryMarkup", story);

	const hostName = story.getHostName();
	return $(`
		<li id="${story.storyId}">
			<a href="${story.url}" target="a_blank" class="story-link">
				${story.title}
			</a>
			<small class="story-hostname">(${hostName})</small>
			<small class="story-author">by ${story.author}</small>
			<small class="story-user">posted by ${story.username}</small>
		</li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */
function putStoriesOnPage() {
	console.debug("putStoriesOnPage");

	$allStoriesList.empty();

	// loop through all of our stories and generate HTML for them
	for (let story of storyList.stories) {
		const $story = generateStoryMarkup(story);
		$allStoriesList.append($story);
	}

	$allStoriesList.show();
}

/**
 * Write a function in stories.js that is called when users submit the form.
 * PAM: doing....
 * Pick a good name for it. pam: 🤔
 * This function should get the data from the form, call the .addStory method you wrote, and then put that new story on the page.
 */
async function whenUsersSubmitTheNewStorySubmitForm(event) {
	event.preventDefault();
	console.log("whenUsersSubmitTheNewStorySubmitForm", event);

	// pam:get the data from the submit form
	const myInputValues = [
		$("#submit-story-title").val(),
		$("#submit-story-author").val(),
		$("#submit-story-url").val(),
	];
	// pam:grab the title author and source
	// pam: D-D-D-D-DESTRUCTION!!!!
	const [title, author, url] = [...myInputValues];
	console.log(`Title: ${title}\nAuthor: ${author}\nSource: ${url}`);
	// pam:call the .addStory method
	const newStoryPayload = { title, author, url };
	console.log("payload:", newStoryPayload);
	const newStory = await storyList.addStory(currentUser, newStoryPayload); // create story in making post request to api, return a story instance thats already been added to our story list
	// pam: put that new story on the page
	putStoriesOnPage();
}

$submitStoryForm.on("submit", whenUsersSubmitTheNewStorySubmitForm);
