const { sppull } = require("sppull");

const context = {
    siteUrl: "<sharepoint url static>",
	creds:{
        username: "<email id>",
        password: "<url>"
	}
};

const options = {
    spRootFolder: "Shared%20Documents/General/SHO",
    dlRootFolder: "/opt/nodejs_oatui/arnab"
};

sppull(context, options)
    .then((downloadResults) => {
        console.log("Files are downloaded");
        console.log("For more, please check the results", JSON.stringify(downloadResults));
    })
    .catch((err) => {
        console.log("Core error has happened", err);
    });
