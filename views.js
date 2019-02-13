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
    text:  `First you will read the transcripts of several utterances. Please answer the question on the bottom by sliding the slider to the position that represents your intuition.
            <br />
            <br />
            In the next part, you will listen to Audios that belong to the transcripts. Please answer the same question again by sliding the slider to the position that represents your intuition. 
	    <br />
            <br />
	    In the last part, you will see the videos that belong to the transcripts and the audios. Please answer the same question again by sliding the slider to the position that represents your intuition.
	    <br />
            <br /> 
	    The slider position does not have to be the same for transcript, audio and video sequence, your intuition may have changed when audible and visual context is given.
	    <br />
            <br />
            The practice trial view uses babe's <a href='https://github.com/babe-project/babe-project/blob/master/docs/images/views_samples/view_fc.png'>slider rating view</a>.`,
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
    title: 'Weitere Angaben',
    text: 'Die Beantwortung der folgenden Fragen ist optional, aber es kann bei der Auswirkung hilfreich sein, damit wir Ihre Antworten besser verstehen.',
    buttonText: 'Weiter',
    age_question: 'Alter',
    gender_question: 'Geschlecht',
    gender_male: 'männlich',
    gender_female: 'weiblich',
    edu_question: 'Höchster Bildungsabschluss',
    edu_graduated_high_school: 'Abitur',
    edu_graduated_college: 'Hochschulabschluss',
    edu_higher_degree: 'Universitärer Abschluss',
    languages_question: 'Muttersprache',
    languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
    comments_question: 'Weitere Kommentare'
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

// part of the practice sample
const practiceSliderRating = babeViews.sliderRating({
    trials: 1,
    name: 'practice_trial',
    trial_type: 'slider_rating_practice',
    data: practice_trials.sliderRating
});

// this view is part of the canvas sample
const sliderRating_trans = babeViews.sliderRating({
    trials: 39,
    name: 'slider_rating_transcripts',
    trial_type: 'slider_rating_main_t',
    data: main_trials_transcript.sliderRating
});

const sliderRating_audio = babeViews.sliderRating_Audio({
    trials: 1,
    name: 'slider_rating_audios',
    trial_type: 'slider_rating_main_a',
    data: main_trials_audio.sliderRating_Audio
});

const sliderRating_video = babeViews.sliderRating_Video({
    trials: 1,
    name: 'slider_rating_videos',
    trial_type: 'slider_rating_main_v',
    data: main_trials_video.sliderRating_Video
});
