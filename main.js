// initialises a babe experiment with babeInit
$("document").ready(function() {
    // prevent scrolling when space is pressed
    window.onkeydown = function(e) {
        if (e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
        }
    };

    // calls babeInit
    babeInit({
        views_seq: [
            intro,

            instructions,
            //practiceSliderRating,

            instructionsCanvas,
            // mainTrial,
	          sliderRating_trans,
	          sliderRating_audio,
	          sliderRating_video,

            instructionsPostTest,
            postTest,

            links,
            thanks,
        ],
        deploy: {
            experimentID: "4",
            serverAppURL: "https://babe-demo.herokuapp.com/api/submit_experiment/",
            deployMethod: "debug",
            contact_email: "YOUREMAIL@wherelifeisgreat.you",
            prolificURL: "https://app.prolific.ac/submissions/complete?cc=SAMPLE1234"
        },
        progress_bar: {
            in: [
                "spr",
                "spr_rating_scale",
                "key_press_main"
            ],
            style: "separate",
            width: 100
        }
    });
});
