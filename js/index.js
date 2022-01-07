import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

const octokit = new Octokit();

$("form").on("submit", function (event) {
	event.preventDefault();

	// Take username from imput form
	var dataForm = ($(this).serializeArray()[0].value);

	async function run() {

		try {

			const response = await octokit.request("GET /users/{username}", {
				username: dataForm
			});

			var dataGithub = response.data;

			test(dataGithub);

			
		} catch (err) {

			var dataGithubError = err.response.data.message;

			test(dataGithubError);

		}


	}

	if (dataForm !== "") {
		run();
	} else{
		console.log("Type a user");
	}

});




function test(parm1){

	if (parm1 !== "Not Found") {

		// Array to contain the months of the year
		var arrayMonths = ["Jan", "Feb", "Mar", "Apr", "May" , "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dic"];

		// Extracting data from parm1(the response of github api)
		var usrAvatar = parm1.avatar_url;
		var usrName = parm1.name;
		var usrLogName = parm1.login;

		// date of registration is extracted and reorganized
		var usrCreatedAt =  (parm1.created_at).slice(0,10);
		var dateYear = (usrCreatedAt).slice(0, 4);
		var dateMonth = arrayMonths[(parseInt((usrCreatedAt).slice(5, 7)-1))];
		var dateDay = (usrCreatedAt).slice(8, 10);

		var usrBio = parm1.bio;
		var usrRepos = parm1.public_repos;
		var usrFollowers = parm1.followers;
		var usrFollowing = parm1.following;

		// array containing the last 4 pieces of data displayed in the app (location, blog, twitter, company)
		// along with a description of each field  
		var socialFields = [{"value":parm1.location, "field":"location"},{"value":parm1.blog, "field":"blog"},{"value":parm1.twitter_username, "field":"twitter"},{"value":parm1.company, "field":"company"}];

		
		// Updating data on the main page 

		$(".dev-info-avatar-name>img").attr("src", usrAvatar);
		$("h2").text(usrName);
		$(".dev-info-avatar-name a").text("@" + usrLogName).attr("href", `https://github.com/${usrLogName}`);
		$(".dev-info-avatar-name p").text("Joined" + " " + dateDay + " " + dateMonth + " " + dateYear);


		if (usrBio === null) {
			$(".dev-info>p").text("This profile has no bio");
		} else{
			$(".dev-info>p").text(usrBio);
		}

		
		$(".repos p").text(usrRepos);
		$(".followers p").text(usrFollowers);
		$(".following p").text(usrFollowing);


		//Function for validate the last four fields
		function validateSocialFields(){

			for (let index = 0; index < socialFields.length; index++) {
				

				if (socialFields[index].value === null || socialFields[index].value === "") {

					var field = socialFields[index].field;

					$(`.${field} span`).text("Not Available");
					$(`.${field} a`).text("Not Available");
				} else{

					var field = socialFields[index].field;
					$(`.${field} span`).text(socialFields[index].value);
					$(`.${field} a`).text(socialFields[index].value).attr("href", "https://twitter.com/" + socialFields[index].value);
				}
				
			}
		}

		validateSocialFields();
			
	} else {
		if (parm1 === "Not Found") {
			$("h2").text("User Not Found!");
		}
		
	}

	
};


//Button for control theme selection
$(".header-controltheme > button").click(function(theme){

	var themeSelected = theme.target.innerText;

	if (theme.target.innerText === "LIGHT") {

		$(".header-controltheme > button").html('DARK<i class="bi bi-moon-fill"></i>');

		changeTheme(themeSelected);
	} else{
		if (theme.target.innerText === "DARK"){
			$(".header-controltheme > button").html('LIGHT<i class="bi bi-brightness-high-fill"></i>');

			changeTheme(themeSelected);
		}
	}


});

//Function to change theme color
function changeTheme(thm){

	if (thm === "LIGHT") {
		$("#theme").attr("href", "css/styles-light.css");
		
		
	} else{
		if (thm === "DARK"){
			$("#theme").attr("href", "css/styles.css");
		
		}
	}

}







