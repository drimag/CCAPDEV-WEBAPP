$(document).ready(function() {
    // TODO: Delete Comment
    $(".delete-c").click(async function() {
        console.log("clicked delete button");
        
        const postNum = params.get('postNum');
        const commentNum = $(this).attr('id').substring(14);
        console.log(commentNum);

        const response = await fetch('/comment', {
            method: 'DELETE',
            body: JSON.stringify({
                postNum: postNum,
                commentNum: commentNum
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });
    });
    // TODO: Create Reply

    // TODO: Edit Comment
    
});