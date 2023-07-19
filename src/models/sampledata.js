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
            },
        ]);
        
        console.log("User Documents inserted successfully");
        console.log(result);
        
        const list_users = await users.find({}).toArray();

        console.log("Users Found");

        // 5 Posts
        const result2 = await posts.insertMany([
            {
                num: 1,
                user_id: list_users[0]._id,
                title: "In Bloom made everyone shine",
                description: "After watching this multiples times and slept on it I feel like I can finally give my full opinion on this debut. Honestly because it was W1 and history of kpop groups having members that are rarely utilised my expectations for everyone except Haobin + matthew was pretty low but they gave everyone such good lines and parts in the MV?? I was legit shocked by how they decided to distribute the lines for each member but it turned out so good!!",
                votes: 215,
                num_comments: 1,
                edited: false
            },
            {
                num: 2,
                user_id: list_users[1]._id,
                title: "backup dancers in bite me",
                description: "i actually enjoyed the song for once after drunk dazed and fever but the choreography felt way too crowded. there's 7 of them already and it felt excessive to have 7 more dancers in the back. i get that it's part of the concept but at times i couldn't even see the boys at the back. they could've done it by pairing up the boys which would've made it feel less messy, something like ive where the 6 girls paired up without needing background dancers",
                votes: 4,
                num_comments: 0,
                edited: false
            },
            {
                num: 3,
                user_id: list_users[2]._id,
                title: "Thoughts on Jungkook Seven MV",
                description: "Okay, I love it. The MV was so fun to watch, especially when he was in the casket and it opened and soohee went \"can yOU NOT!\" I love the song. I love the rhythm and Jungkook's voice and how it carries so smoothly and I just know he's going to devour it when he performs it live because those vocals of his are just that extraordinary. Also, it's catchy. I have a love-hate relationship with catchy songs but goddamn Jeon Jungkook he just never misses. Also LATTO'S PART???? Ive never listened to her music but holy I loved her part, I know what I'm gonna be repeating like a broken CD player for the next few weeks lol",
                votes: 131,
                num_comments: 2,
                edited: false
            },
            {
                num: 4,
                user_id: list_users[3]._id,
                title: "Enhypen Fate World Tour",
                description: "So I haven't gone to any concert before and everything just confuses me. I really want to go to this because they are my ults. Do you guys know when the tickets will go on sale or if they have already? I have looked it up and stuff but haven't found anything. I will probably be going to the Chicago one but I don't have info on it. Also ticket master says there's no info on it either. Ticket master overall is confusing. Help please😭",
                votes: 0,
                num_comments: 0,
                edited: false
            },
            {
                num: 5,
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
        const post2 = await posts.findOne({title: "In Bloom made everyone shine"});
        const post3 = await posts.findOne({title: "Thoughts on Jungkook Seven MV"});
        // 5 Comments
        const result3 = await comments.insertMany([
            {
                user_id: list_users[0]._id,
                post_id: post._id,
                comment: "Right now I am underwhelmed by the song, it's way too repetitive and boring for me.",
                votes: 0,
                num_comments: 0,
                comments_id: [],
                edited: false
            },
            {
                user_id: list_users[2]._id,
                post_id: post._id,
                comment: "I didn't enjoy newjeans music apart from Ditto and I don't like Super Shy but I'm in the minority. I don't think catchiness is necessary in a song so I don't get why this \"I can't get this out of my head\" is used as a compliment but I'm probably in the minority again",
                votes: 1,
                num_comments: 0,
                comments_id: [],
                edited: false
            },
            {
                user_id: list_users[4]._id,
                post_id: post2._id,
                comment: "WE GOT VOCALBASEONE FOR REAL 😭",
                votes: 38,
                num_comments: 0,
                comments_id: [],
                edited: false
            },
            {
                user_id: list_users[2]._id,
                post_id: post3._id,
                comment: "The explicit version, BYE.",
                votes: 1,
                num_comments: 0,
                comments_id: [],
                edited: false
            },
            {
                user_id: list_users[1]._id,
                post_id: post3._id,
                comment: "I'm sorry but I cannot with songs that list the days of the week in the chorus. It's a no for me.",
                votes: 0,
                num_comments: 0,
                comments_id: [],
                edited: false
            },

            // DELETE: Testing purposes
            {
                user_id: list_users[1]._id,
                post_id: post3._id,
                comment: "1",
                votes: 0,
                num_comments: 0,
                comments_id: [],
                edited: false
            },
            {
                user_id: list_users[1]._id,
                post_id: post3._id,
                comment: "2",
                votes: 0,
                num_comments: 0,
                comments_id: [],
                edited: false
            },
            {
                user_id: list_users[1]._id,
                post_id: post3._id,
                comment: "3",
                votes: 0,
                num_comments: 0,
                comments_id: [],
                edited: false
            },
            {
                user_id: list_users[1]._id,
                post_id: post3._id,
                comment: "4",
                num_comments: 0,
                comments_id: [],
                edited: false
            },
            {
                user_id: list_users[1]._id,
                post_id: post3._id,
                comment: "5",
                votes: 0,
                num_comments: 0,
                comments_id: [],
                edited: false
            },
            {
                user_id: list_users[1]._id,
                post_id: post3._id,
                comment: "6",
                votes: 0,
                num_comments: 0,
                comments_id: [],
                edited: false
            }
        ])
        console.log("Comment Documents inserted successfully");
        console.log(result3);
    } catch (err) {
        callback(err);
    }
}