/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

* More about the properties and functions of the wrapping views - https://github.com/babe-project/babe-project/blob/master/docs/views.md#wrapping-views-properties

*/

const intro = babeViews.intro({
    trials: 1,
    name: 'intro',
    text:   `Welcome to this experiment!
            <br />
            <br />
            This experiment requires no prior knowledge and there are no wrong answers.
            <br />
            <br />
            All you need to do is enter your intuition.`,
    buttonText: 'begin the experiment'
});

const instructions = babeViews.instructions({
    trials: 1,
    name: 'instructions',
    title: 'General Instructions',
    text:  `Please answer the questions according to what you think the speaker is expressing.`,
    buttonText: 'to the practice trial'
});

const instructionsCanvas = babeViews.begin({
    trials: 1,
    name: 'instructions_canvas',
    title: 'SliderRatings',
    text:   `You will see a <a href='https://github.com/babe-project/babe-project/blob/master/docs/images/views_samples/view_sr.png'>Slilder Rating task</a>`,
    buttonText: 'Start the experiment'
});


const instructionsPostTest = babeViews.instructions({
    trials: 1,
    name: 'instructions_post_test',
    title: 'Post Questionnaire',
    text: `Next you will see a sample <a href='/'>Post Test view</a>. 
    	   The default questions and answer options are in English, however, the whole questionnaire can be translated. In the following Post Test
    sample the questions are in German.`
});

// the post questionnaire can be translated
const postTest = babeViews.postTest({
    trials: 1,
    name: 'post_test',
    title: 'Further Information',
    text: 'To answer the following questions is optional, however it may help to understand your answers better.',
    buttonText: 'Next',
    age_question: 'Age',
    gender_question: 'Gender',
    gender_male: 'male',
    gender_female: 'female',
    edu_question: 'Highest educational degree',
    edu_graduated_high_school: 'High School graduation',
    edu_graduated_college: 'College graduation',
    edu_higher_degree: 'Higher educational degree',
    languages_question: 'Mother language',
    languages_more: '(mostly, the language you spoke at home when you were a child)',
    comments_question: 'Furher comments'
});

const links = babeViews.instructions({
    trials: 1,
    name: 'links',
    title: 'Further information',
    text: `This was a short presentation of babe's functionality.
        <br />
        <br />
        This sample's file organization:
        <br />
        <b>views.js</b> - all the views are created here.
        <br />
        <b>trials.js</b> - contains the trial information used in the trial views.
        <br />
        <b>events.js</b> - the local functions are created here.
        <br />
        <b>main.js</b> - the experiment is initialized here.
        <br />
        <br />
        Babe's documentation:
        <br />
        <br />
        <a href='https://github.com/babe-project/babe-project/blob/master/docs/views.md'>all about the views</a>
        <br />
        <a href='https://github.com/babe-project/babe-project/blob/master/docs/canvas.md'>babe canvas</a>
        <br />
        <a href='https://github.com/babe-project/babe-project/blob/master/docs/views.md#trial-views-lifecycle'>view lifecycle</a>
        <br />
        <a href='https://github.com/babe-project/babe-project/blob/master/docs/views.md#trial-views-hooks'>hooks</a>
        <br />
        <a href='/'>loops</a>
        <br />
        <a href='https://github.com/babe-project/babe-project#progress-bar'>progress bars</a>
        <br />
        <br />
        This sample ran in Debug mode. Next you will see a results table with your answers.`
})

// submits the results
const thanks = babeViews.thanks({
    trials: 1,
    name: 'thanks',
    title: 'Thank you for taking part in this experiment!',
    prolificConfirmText: 'Press the button'
});

/** trial (babe's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string
    - trial_type: string - the name of the trial type as you want it to appear in the submitted data
    - data: array - an array of trial objects


* Optional properties

    - pause: number (in ms) - blank screen before the fixation point or stimulus show
    - fix_duration: number (in ms) - blank screen with fixation point in the middle
    - stim_duration: number (in ms) - for how long to have the stimulus on the screen
        More about trial lifecycle - https://github.com/babe-project/babe-project/blob/master/docs/views.md#trial-views-lifecycle

    - hook: object - option to hook and add custom functions to the view   
        More about hooks - https://github.com/babe-project/babe-project/blob/master/docs/views.md#trial-views-hooks

* All about the properties of trial - https://github.com/babe-project/babe-project/blob/master/docs/views.md#properties-of-trial

*/


var sliderRatingStimulus = function(config) {
        babeUtils.view.inspector.missingData(config, "slider rating");
        babeUtils.view.inspector.params(config, "slider rating");
        const sliderRatingVideo = {
            name: config.name,
            title: babeUtils.view.setter.title(config.title, ""),
            render: function(CT, babe) {
                let startingTime;
                const question = babeUtils.view.setter.question(
                    config.data[CT].question
                );
                const QUD = babeUtils.view.setter.QUD(config.data[CT].QUD);
                const stimulus = config.data[CT].stimulus;
		const option1 = config.data[CT].optionLeft;
                const option2 = config.data[CT].optionRight;
                const viewTemplate = `<div class='babe-view'>
                    <h1 class='babe-view-title'>${this.title}</h1>
                    <p class='babe-view-question babe-view-QUD'>${QUD}</p>
                    <div class='babe-view-stimulus-container'>
                        <div class='babe-view-stimulus babe-nodisplay'>${stimulus}<></div>
                    </div>
                </div>`;

                const answerContainerElem = `<p class='babe-view-question'>${question}</p>
                <div class='babe-view-answer-container'>
                    <span class='babe-response-slider-option'>${option1}</span>
                    <input type='range' id='response' class='babe-response-slider' min='0' max='100' value='50'/>
                    <span class='babe-response-slider-option'>${option2}</span>
                </div>
                <button id="next" class='babe-view-button babe-nodisplay'>Next</button>`;

                $("#main").html(viewTemplate);

                const enableResponse = function() {
                    let response;

                    $(".babe-view").append(answerContainerElem);

                    response = $("#response");
                    // checks if the slider has been changed
                    response.on("change", function() {
                        $("#next").removeClass("babe-nodisplay");
                    });
                    response.on("click", function() {
                        $("#next").removeClass("babe-nodisplay");
                    });

                    $("#next").on("click", function() {
                        const RT = Date.now() - startingTime; // measure RT before anything else
                        const trial_data = {
                            trial_type: config.trial_type,
                            trial_number: CT + 1,
                            response: response.val(),
                            RT: RT
                        };

                        for (let prop in config.data[CT]) {
                            if (config.data[CT].hasOwnProperty(prop)) {
                                trial_data[prop] = config.data[CT][prop];
                            }
                        }

                        if (config.data[CT].picture !== undefined) {
                            trial_data.picture = config.data[CT].picture;
                        }

                        if (config.data[CT].canvas !== undefined) {
                            for (let prop in config.data[CT].canvas) {
                                if (
                                    config.data[CT].canvas.hasOwnProperty(prop)
                                ) {
                                    trial_data[prop] =
                                        config.data[CT].canvas[prop];
                                }
                            }
                        }

                        babe.trial_data.push(trial_data);
                        babe.findNextView();
                    });
                };

                startingTime = Date.now();

                // creates the DOM of the trial view
                babeUtils.view.createTrialDOM(
                    {
                        pause: config.pause,
                        fix_duration: config.fix_duration,
                        stim_duration: config.stim_duration,
                        data: config.data[CT],
                        evts: config.hook,
                        view: "sliderRatingVideo"
                    },
                    enableResponse
                );
            },
            CT: 0,
            trials: config.trials
        };

        return sliderRatingVideo;
}


const pressTheButton = function(config) {
    const _pressTheButton = {
        name: config.name,
        title: config.title,
        buttonText: config.buttonText,
        render(CT, babe) {
            let startTime = Date.now();

            const viewTemplate =
            `<div class='view'>
                <h1 class="title">${this.title}</h1>
                <button id="the-button">${this.buttonText}</button>
            </div>`;

            $("#main").html(viewTemplate);

            $('#the-button').on('click', function(e) {
                babe.trial_data.push({
                    trial_type: config.trial_type,
                    trial_number: CT+1,
                    RT: Date.now() - startTime
                });
                babe.findNextView();
            });
        },
        CT: 0,
        trials: config.trials
    };

    return _pressTheButton;
};

// const mainTrial = sliderRatingVideo({
//     name: 'buttonPress',
//     title: 'How quickly can you press this button?',
//     buttonText: 'Press me!',
//     trial_type: 'main',
//     trials: 1
// });


// part of the practice sample
// const practiceSliderRating = babeViews.sliderRating({
//     trials: 1,
//     name: 'practice_trial',
//     trial_type: 'slider_rating_practice',
//     data: practice_trials.sliderRating
// });

// this view is part of the canvas sample
const sliderRating_trans = babeViews.sliderRating({
     trials: 3,
     name: 'slider_rating_transcripts',
     trial_type: 'slider_rating_main_t',
     data: main_trials_transcript.sliderRating 
 });

 const sliderRating_audio = sliderRatingStimulus({
     trials: 2,
     name: 'slider_rating_audios',
     trial_type: 'slider_rating_main_a',
     data: main_trials_audio.sliderRating_Audio
});

const sliderRating_video = sliderRatingStimulus({
    trials: 2,
    name: 'slider_rating_videos',
    trial_type: 'slider_rating_main_v',
    data: main_trials_video.sliderRating_Video
});

