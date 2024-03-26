const mongoose = require('mongoose');
const User = require('../../models/user');
const Community = require('../../models/community');
const CommunityAward = require('../../models/communityAward');
const CommunityPost = require('../../models/communityPost');


describe('Community Award Post Model Test', () => {
	let demoObject;
	let demoObject2;
	let demoObject3;
	let demoObject4;

	beforeAll(async () => {
		try {
			collection = 'test';
			const url = `mongodb+srv://cloudChasers:mUq0OT5xkbeqjXDA@goblcluster.ijglc9m.mongodb.net/${collection}?retryWrites=true&w=majority`;
			await mongoose.connect(url);
			console.log('Connected to the database');

			const demoData = {
				name: "Demo Award",
				description: "This is a demo community award."
			};
			const validObject = new CommunityAward(demoData);
			demoObject = await validObject.save();

			const demoData2 = { 
				forename: 'Jane', 
				surname: 'Doe', 
				username: 'janedoe', 
				email: 'jane@doe.com', 
				password: 'password', 
				dateOfBirth: new Date() 
			};
			const validUser2 = new User(demoData2);
			demoObject2 = await validUser2.save();
            
			const demoData3 = {
				name: "My Community",
				description: "This is a demo community",
				recipePrivacy: "public",
				joinPrivacy: "private",
				createdBy: demoObject2._id 
			};
			const validObject3 = new Community(demoData3);
			demoObject3 = await validObject3.save();

			const demoData4 = { 
				communityID: demoObject3._id,
				userID: demoObject2._id, 
				text: "This is a demo community post.",
				title: "Demo Post"
			};
			const validObject4 = new CommunityPost(demoData4);
			demoObject4 = await validObject4.save();
		} catch (err) {
			console.error('Error connecting to the database.', err);
			process.exit(1);
		}
	});

	it('create & save community post successfully', () => {
		expect(demoObject4._id).toBeDefined();
		expect(demoObject4.communityID).toBe(demoObject3._id);
		expect(demoObject4.userID).toBe(demoObject2._id);
		expect(demoObject4.date).toBeDefined();
		expect(demoObject4.text).toBe("This is a demo community post.");
		expect(demoObject4.title).toBe("Demo Post");
	});

	afterAll(async () => {
		await User.deleteOne({ _id : demoObject2._id });
		await Community.deleteOne({ _id : demoObject3._id });
		await CommunityAward.deleteOne({ _id : demoObject._id });
		await CommunityPost.deleteOne({ _id : demoObject4._id });
		await mongoose.disconnect();
	});
});