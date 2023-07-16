import { getDb } from "./conn.js";

const db = getDb();

export async function addSampleData (callback) {
    // Create Collections
    const users = db.collection("users");
    const posts = db.collection("posts");
    const comments = db.collection("comments");

    // Drop Current Collections
    try {
        await users.drop();
        console.log("User Collection dropped");
    } catch {
        console.log("User Collection did not exist");
    }

    try {
        await posts.drop();
        console.log("Post Collection dropped");
    } catch {
        console.log("Post Collection did not exist");
    }

    try {
        await comments.drop();
        console.log("Comment Collection dropped");
    } catch {
        console.log("Comment Collection did not exist");
    }

    // Insert Sample Data Into DB
    try {
        // 5 Users
        const result = await users.insertMany([
            {
                username: "kkura",
                password: "1234",
                bio: "hi! i'm kkura"
            },
            {
                username: "chaechae",
                password: "1234",
                bio: "hi! i'm chae"
            },
            {
                username: "yunjin",
                password: "1234",
                bio: "hi! i'm jennifer"
            },
            {
                username: "zuha",
                password: "1234",
                bio: "hi! i'm zuha"
            },
            {
                username: "manchae",
                password: "1234",
                bio: "hi! i'm manchae"
            }
        ]);
        
        console.log("User Documents inserted successfully");
        console.log(result);
        
        const list_users = await users.find({}).toArray();

        console.log("Users Found");

        // 5 Posts
        const result2 = await posts.insertMany([
            {
                user_id: list_users[0]._id,
                title: "test 1",
                description: "test 1",
                votes: 0,
                num_comments: 0,
                edited: false
            },
            {
                user_id: list_users[1]._id,
                title: "backup dancers in bite me",
                description: "i actually enjoyed the song for once after drunk dazed and fever but the choreography felt way too crowded. there's 7 of them already and it felt excessive to have 7 more dancers in the back. i get that it's part of the concept but at times i couldn't even see the boys at the back. they could've done it by pairing up the boys which would've made it feel less messy, something like ive where the 6 girls paired up without needing background dancers",
                votes: 4,
                num_comments: 0,
                edited: false
            },
            {
                user_id: list_users[2]._id,
                title: "Thoughts on Jungkook Seven MV",
                description: "Okay, I love it. The MV was so fun to watch, especially when he was in the casket and it opened and soohee went \"can yOU NOT!\" I love the song. I love the rhythm and Jungkook's voice and how it carries so smoothly and I just know he's going to devour it when he performs it live because those vocals of his are just that extraordinary. Also, it's catchy. I have a love-hate relationship with catchy songs but goddamn Jeon Jungkook he just never misses. Also LATTO'S PART???? Ive never listened to her music but holy I loved her part, I know what I'm gonna be repeating like a broken CD player for the next few weeks lol",
                votes: 131,
                num_comments: 0,
                edited: false
            },
            {
                user_id: list_users[3]._id,
                title: "test 4",
                description: "test 4",
                votes: 0,
                num_comments: 0,
                edited: false
            },
            {
                user_id: list_users[4]._id,
                title: "'Super Shy' for Song Of The Year and that's that.",
                description: "I'm all for people and their opinions but let's face the facts. I might be making this statement a little too fast but I'm super shy super shy has kinda already gotten glued to my head and I'm not sure I'll be able to remove it anytime now. It just has the perfect catchiness, bubbly upbeat funness to be a hit. I'm all here for it. It sounds very 'beabadoobee'.",
                votes: 0,
                num_comments: 2,
                edited: false
            }
        ]);
        
        console.log("Post Documents inserted successfully");
        console.log(result2);

        const post = await posts.findOne({title: "'Super Shy' for Song Of The Year and that's that."});
        // 5 Comments
        const result3 = await comments.insertMany([
            {
                user_id: list_users[0]._id,
                post_id: post._id,
                comment: "Right now I am underwhelmed by the song, it's way too repetitive and boring for me.",
                votes: 0,
                num_comments: 0,
                edited: false
            },
            {
                user_id: list_users[2]._id,
                post_id: post._id,
                comment: "I didn't enjoy newjeans music apart from Ditto and I don't like Super Shy but I'm in the minority. I don't think catchiness is necessary in a song so I don't get why this \"I can't get this out of my head\" is used as a compliment but I'm probably in the minority again",
                votes: 0,
                num_comments: 0,
                edited: false
            }
        ])
        console.log("Comment Documents inserted successfully");
        console.log(result3);
    } catch (err) {
        callback(err);
    }
}