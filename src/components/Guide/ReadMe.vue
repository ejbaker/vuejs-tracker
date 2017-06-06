<template>
	<transition name="bounce">
		<main v-once>
			<table-of-contents/>
			<section>
				<p class="note">
				This app uses LOCAL STORAGE, falling back to cookies, to save your template while you're using it.
				But if you log out, your template <i>will be lost</i>, so remember to save that on your hard drive somewhere!
				</p>

				<h1 id="getting-started">Getting Started</h1>
				<p>
				Before you can use this app, you will need:
				</p>
				<ul>
				<li>a separate Google account for your RP activity (optional)</li>
				<li>a Google Spreadsheet of the activity you wish to pretty up, belonging to the account you want to use</li>
				<li>a correctly-configured API key from Google, belonging to the same account</li>
				<li>a layout snippet for your desired journaling platform (<a href="https://dreamcodes.dreamwidth.org/tag/thread+trackers">for example, from here</a>)</li>
				</ul>

				<h2 id="the-spreadsheet">The Spreadsheet <more :hidden="step.a" @toggle="toggleStep('a')"/></h2>

				<div v-show="step.a">
				<p>
				Go to <a href="https://docs.google.com/spreadsheets/u/0/">docs.google.com/spreadsheets</a> and choose "Blank" from the options.
				</p>

				<img src="https://i.imgur.com/l3QfMfn.png">

				<p>
				Give your spreadsheet a name (I called mine Example Threadtracker), and start filling in data.
				You honestly don't need to know very much about spreadsheets, but it is recommended that you make
				your top row into labels, so that you can use "friendly" names to refer to the columns later.
				</p>

				<aside>
				<h4>
				A Word On Labels
				<more :hidden="aside.a" @toggle="toggleAside('a')"/>
				</h4>
				<div v-show="aside.a">
				<p>
				If you opt to Use Labels (recommended), this app will use the first row of each spreadsheet as a guide
				for giving the other fields more useful names. Otherwise, you'll be able to refer to them by index --
				<code v-pre>{{ thread.date }}</code>
				vs.
				<code v-pre>{{ thread[0] }}</code>
				-- but I think we can all agree that the labels are more readable!
				</p>
				<p class="note">
				This app will attempt to NORMALIZE whatever labels you use, so "Characters' Names" will become characters_names
				(all lowercase, replacing the space with an underscore, and removing the non-alphanumeric character).
				</p>
				</div>
				</aside>

				<p>
				After you've entered some activity, your spreadsheet will hopefully look something like this:
				</p>

				<img src="http://i.imgur.com/8Re6ICm.png">
				<p>My example columns here are "Date", "Title", "Characters", "Link", "Description", and "AC Length".
				Mostly very straightforward... but we'll talk about AC Length and its "Yes/No" value in a bit.</p>
				<p>
				There's one more <i>very</i> important step, and one more optional step, before we're done with this document.
				</p>
				<p>
				First, let's make the document <i>shareable</i>. (Don't worry, this is completely reversible. After you're done importing the data, you can make it private again.)
				</p>
				<img src="http://i.imgur.com/vM6bKeR.png">
				<p>Look in the top left corner of the document and click the "Share" button that currently tells you your document is private.</p>
				<img src="http://i.imgur.com/ECKeN3c.png">
				<p>This dialogue will pop up. Click on the "Get sharable link" text to expand the dialogue.</p>
				<img src="http://i.imgur.com/wxUqj5I.png">

				<p>The setting you want is "anyone with the link can <b>view</b>".

				<p>Your <b>Sheet ID</b> is the part of your share link between the <b>/d/</b> and the next <b>/</b>, like so:

				<img src="http://i.imgur.com/8ZUxwqq.png">

				<p>Now for that optional step I mentioned. You may want to give your sheet a <b>meaningful name</b>, whether
				you're going to be using the individual-sheets or the whole-document mode of this app. I find it useful to
				label it with the month ("May, 2017"), since I like to use layouts that display the month name prominently.</p>

				<div class="images">
				<img src="http://i.imgur.com/sNXnbzQ.png">
				<img src="http://i.imgur.com/kCTPIIX.png">
				</div>

				<aside>
				<h4>
				Extra Features
				<more :hidden="aside.b" @toggle="toggleAside('b')"/>
				</h4>
				<div v-show="aside.b">
				<p>
				You can also get a little fancier. In addition to yes/no fields, you can also leave fields blank.
				If you tell the app to detect nested threads, it will look to see if either of the first two fields
				in a row are blank, and when they are it will treat these rows like <i>children</i> of the last
				row where those fields were filled in.
				</p>
				<img src="https://i.imgur.com/Fl1u5a1.png">
				<p>
				This lets you create more complicated layouts where you might have a "main" thread (say, a top-level)
				and "sub" threads that you'd like to show are related to the "main" one.
				</p>
				<p>
				In a CR chart, you can also take advantage of this feature to display <i>updates</i> to CR, say if 
				you've got a layout where you keep track of changes to the relationship!
				</p>
				</div>
				</aside>

				<p>Now we've got our Google Sheet. Time to get our API key!</p>
				</div>

				<h2>The API Key <more :hidden="step.b" @toggle="toggleStep('b')"/></h2>
				<div v-show="step.b">
				<p>Go to <a href="https://console.developers.google.com/projectselector/apis/credentials">console.developers.google.com</a>
				to get started. You'll probably be prompted to Create a Project first.</p>
				<img src="http://i.imgur.com/bL5Ct9p.png">
				<p>I called mine "Thread Tracker" but the important part is just that it's something you'll remember.</p>
				<img src="http://i.imgur.com/ctNRP7u.png">
				<p>(You'll be able to re-use the same API key for as many Google Sheets as you want.</p>
				<p>Now we can create credentials!</p>
				<img src="http://i.imgur.com/SKcJ6ho.png">
				<p>Specifically, an API key.</p>
				<img src="http://i.imgur.com/0b5jtrL.png">
				<p>You can copy the key now (SAVE IT SOMEWHERE ON YOUR COMPUTER), but let's restrict it first.</p>
				<img src="http://i.imgur.com/PFAmDSO.png">
				<p>Give it a name (again, something you'll recognize) and choose either HTTP REFERRERS and <b>https://s.codepen.io/*</b> (tested)</p>
				<img src="http://i.imgur.com/85e2sBa.png">
				<p>or IP ADDRESS (untested, but it should work if you restrict it to your own IP address)</p>
				<p>Now go to the Dashboard (link on the left hand pane) and click <b>Enable API</b>.</p>
				<img src="http://i.imgur.com/uw41sSL.png">
				<p>You should see a list of libraries. There's a lot of them! Let's type <i>sheets</i> to narrow it down.</p>
				<img src="http://i.imgur.com/cEKnbOm.png">
				<p>Click on <b>Google Sheets API</b>.</p>
				<img src="http://i.imgur.com/37G1x4z.png">
				<p>And enable it!</p>
				</div>

				<h2>The Code Snippet <more :hidden="step.c" @toggle="toggleStep('c')"/></h2>

				<div v-if="step.c">
				<p>Let's use the <i>Modern Feel</i> code from <a href="https://bootycall.dreamwidth.org/10069.html">here</a>,
				courtesy of Dreamwidth user <b>bootycall</b>, as an example.</p>

				<ul>
				<li>Choose which version of the code you want to use. I picked the <b>turquoise</b> version.</li>
				<li>Copy the layout snippet from the text area into your preferred editor.</li>
				<li>Look for the parts of it that repeat, and edit them.</li>
				</ul>
				<p>If we're using the whole-document mode, the parts that repeat are going to be the
				beginning with the month list, and the "entry" divs.
				</p>

				<h3>Outer Repeat <more :hidden="step.d" @toggle="toggleStep('d')"/></h3>
				<div v-show="step.d">
				<p>From...</p>
				<pre class="pre-scrollable"><code>&lt;!--MONTH BEGIN-->

				&lt;span style="color: #004343; font-family: minerva, sans-serif; font-size: 18pt; text-transform: uppercase; letter-spacing: 0.2em; line-height: 24pt; font-weight: bold; text-shadow: -2px -2px 0px #fff, 0px -2px 0px #fff, 2px -2px 0px #fff, -2px  0px 0px #fff, 2px 0px 0px #fff, -2px 2px 0px #fff, 0px  2px 0px #fff, 2px 2px 0px #fff; padding-left: 25px;">**MONTH**✦**YEAR**&lt;/span></code></pre>					
				<p>
				...to...
				</p>
				<pre class="pre-scrollable"><code>&lt;!--MONTH END--></code></pre>					
				<p>
				... is going to be inside a big ole repeating <code>&lt;template></code> tag, like so:
				</p>
				<pre class="pre-scrollable" v-pre><code>&lt;template v-for="page in doc">&lt;!--MONTH BEGIN-->

				&lt;span style="color: #004343; font-family: minerva, sans-serif; font-size: 18pt; text-transform: uppercase; letter-spacing: 0.2em; line-height: 24pt; font-weight: bold; text-shadow: -2px -2px 0px #fff, 0px -2px 0px #fff, 2px -2px 0px #fff, -2px  0px 0px #fff, 2px 0px 0px #fff, -2px 2px 0px #fff, 0px  2px 0px #fff, 2px 2px 0px #fff; padding-left: 25px;">{{ page.name }}&lt;/span>

				...

				&lt;!--MONTH END-->&lt;/template></code></pre>
				<p>
				I know that's kind of a lot to take in, so here are the highlights:
				</p>
				<ul>
				<li>I added <code v-pre>&lt;template v-for="page in doc"></code> to the beginning.</li>
				<li>Since I used "May, 2017" as my sheet name, I just replaced <code>**MONTH**✦**YEAR**</code> with <code v-pre>{{ page.name }}</code>.</li>
				</ul>

				<p>
				<code>doc</code> is the name of your data source, which will be <i>the entire document</i> if you're using whole-document mode, or <i>your selected sheet</i> if you aren't.
				<p class="note">To be clear, <code>page</code> is just what I am opting to call the sheet, but you can name the second variable <i>anything you like.</i>
				<code>sheet</code>, <code>threads</code>, anything you like. Just be consistent.</p>
				<p>If I leave the <code>page.name</code> variable just like that, it's not as pretty as it could be... I can also use a <b>date filter</b> on it like this:
				<code v-pre>{{ page.name | date('MMMM✦YYYY') }}</code>
				which is using <a href="https://momentjs.com/docs/#/displaying/">MomentJS formatting</a> to turn that into "May✦2017".
				</p>
				</div>

				<h3>The Inner Repeat <more :hidden="step.e" @toggle="toggleStep('e')"/></h3>
				<div v-show="step.e">
				<p>The other part we need to repeat for a simple use of this layout is the individual "thread" div.</p>
				<pre class="pre-scrollable"><code>&lt;div style="background-color: #00565b; padding: 10px; border-radius: 10px; border: solid 1px #fff; color: #d6ecea; margin-bottom: 5px;">&lt;a href="URL" style="color: #fff; font-weight: bold; text-shadow: -1px -1px 0px #5a9185, 0px -1px 0px #5a9185, 1px -1px 0px #5a9185, -1px  0px 0px #5a9185, 1px 0px 0px #5a9185, -1px 1px 0px #5a9185, 0px  1px 0px #5a9185, 1px 1px 0px #5a9185; text-decoration: none; letter-spacing: 0.2em;">**THREAD TITLE**  ▸&lt;/a> &lt;span style="color: #aacfd1; font-weight: normal; font-style: italic; letter-spacing: 0.1em;">Character 1, Character 2&lt;/span>&lt;br/>
				&lt;div style="line-height:11pt;">
				&lt;!--YOUR TEXT BEGINS HERE-->

				&lt;!--YOUR TEXT ENDS HERE-->&lt;/div>&lt;/div></code></pre>

				<p>Assuming a Google Spreadsheet with the same <b>labels</b> as the ones I used above (and the whole-document 
				mode used), that will turn out looking like this:
				</p>
				<pre class="pre-scrollable" v-pre><code>&lt;div v-for="thread in page.content" style="background-color: #00565b; padding: 10px; border-radius: 10px; border: solid 1px #fff; color: #d6ecea; margin-bottom: 5px;">&lt;a :href="thread.link" style="color: #fff; font-weight: bold; text-shadow: -1px -1px 0px #5a9185, 0px -1px 0px #5a9185, 1px -1px 0px #5a9185, -1px  0px 0px #5a9185, 1px 0px 0px #5a9185, -1px 1px 0px #5a9185, 0px  1px 0px #5a9185, 1px 1px 0px #5a9185; text-decoration: none; letter-spacing: 0.2em;">{{ thread.title }}  ▸&lt;/a> &lt;span style="color: #aacfd1; font-weight: normal; font-style: italic; letter-spacing: 0.1em;">{{ thread.characters || 'Open Post' }}&lt;/span>&lt;br/>
				&lt;div style="line-height:11pt;">
				&lt;!--YOUR TEXT BEGINS HERE-->
				{{ thread.description }}
				&lt;!--YOUR TEXT ENDS HERE-->&lt;/div>&lt;/div></code></pre>
				Again, here's what I changed:<br><br>
				<ul>
				<li><code>&lt;div style="background-color: ...</code> became <code v-pre>&lt;div v-for="thread in page.content" style="background-color: ...</code></li>
				<li><code>**THREAD TITLE**</code> became <code v-pre>{{ thread.title }}</code></li>
				<li><code>Character 1, Character 2</code> became <code v-pre>{{ thread.characters || 'Open Post' }}</code></li>
				<li>...and we inserted <code v-pre>{{ thread.description }}</code> where the original code just has empty space.</li>
				</ul>
				<p><b>TIP:</b> The reason why I used <code>&lt;template>&lt;/template></code> for the first repeat was that there was
				<i>no containing HTML element</i> around the section I wanted to repeat. Here, the <code>&lt;div>&lt;/div></code> encapsulates the entire entry!
				So I can just put the <code>v-if</code> attribute directly onto the div, and keep my template a little bit neater.</p>
				<p class="note">Again, <code>thread</code> is just what I opted to call this variable. <code>x</code> or <code>row</code> would work just as well!</p>
				</div>

				<h3>The Complete Code <more :hidden="step.f" @toggle="toggleStep('f')"/></h3>
				<div v-show="step.f">
				<p>And here it is, all put together...</p>
				<textarea v-pre><center><raw-code><div style="width: 600px; border-radius: 15px; padding: 15px; border: solid 1px #1e6f5f; background-color: #d6ecea; background-image: url(http://imgur.com/39EfctA.png); background-repeat: repeat; box-shadow: 2px 2px 0px #a0adae; text-align: left;">

				<template v-for="page in doc"><!--MONTH BEGIN-->

				<span style="color: #004343; font-family: minerva, sans-serif; font-size: 18pt; text-transform: uppercase; letter-spacing: 0.2em; line-height: 24pt; font-weight: bold; text-shadow: -2px -2px 0px #fff, 0px -2px 0px #fff, 2px -2px 0px #fff, -2px  0px 0px #fff, 2px 0px 0px #fff, -2px 2px 0px #fff, 0px  2px 0px #fff, 2px 2px 0px #fff; padding-left: 25px;">{{ page.name | date('MMMM✦YYYY') }}</span>

				<div v-for="thread in page.content" style="background-color: #00565b; padding: 10px; border-radius: 10px; border: solid 1px #fff; color: #d6ecea; margin-bottom: 5px;"><a :href="thread.link" style="color: #fff; font-weight: bold; text-shadow: -1px -1px 0px #5a9185, 0px -1px 0px #5a9185, 1px -1px 0px #5a9185, -1px  0px 0px #5a9185, 1px 0px 0px #5a9185, -1px 1px 0px #5a9185, 0px  1px 0px #5a9185, 1px 1px 0px #5a9185; text-decoration: none; letter-spacing: 0.2em;">{{ thread.title }}  ▸</a> <span style="color: #aacfd1; font-weight: normal; font-style: italic; letter-spacing: 0.1em;">{{ thread.characters || 'Open Post' }}</span><br/>
				<div style="line-height:11pt;">
				<!--YOUR TEXT BEGINS HERE-->
				{{ thread.description }}
				<!--YOUR TEXT ENDS HERE--></div></div>

				<!--MONTH END--></template>

				<center><span style="line-height: 8px; font-weight: bold; color: #399ba1; text-shadow: -2px -2px 0px #fff, 0px -2px 0px #fff, 2px -2px 0px #fff, -2px  0px 0px #fff, 2px 0px 0px #fff, -2px 2px 0px #fff, 0px  2px 0px #fff, 2px 2px 0px #fff;">CODED BY <a href="http://bootycall.dreamwidth.org" style="color: #004343; text-decoration: none;">BOOTYCALL</a></span></center>   
				</div></raw-code></center></textarea>
				</div>
				</div>

				<aside>
				<h4>Obsolete HTML <more :hidden="aside.c" @toggle="toggleAside('c')"/></h4>
				<div v-show="aside.c">
				<p>
				Because this app runs your HTML through your browser's parser, you might run into trouble with
				<i>very old</i> HTML tags, like <code>&lt;font size=4></code> and the like. In my testing,
				the app stripped this tag out entirely, and I had to replace it with an appropriate <code>&lt;span></code>
				instead.
				</p>
				<p>
				For the font size tag in particular,
				<a href="https://stackoverflow.com/questions/819079/how-to-convert-font-size-10-to-px?answertab=votes#tab-top">this StackOverflow user provided a table of conversions</a>
				based on their browser rendering. You may need to tweak the values slightly to get the output you expect!
				</p>
				<p>
				If there's enough interest, I might also be able to add a filter to the code to replace the tags with spans,
				or preserve them (the way I preserve <code>&lt;raw-code></code> tags, which are vital).
				</p>
				</div>
				</aside>

				<p class="nav"><a href="#top">Back to Top</a></p>

				<h1 id="how-to-use-this-app">
				How to Use This App
				</h1>

				<h2>"Logging In" <more :hidden="step.g" @toggle="toggleStep('g')"/></h2>
				<div v-show="step.g">
				<p>
				Take your <b>API key</b> and <b>Sheet ID</b> from Step 1.1 and Step 1.2. Paste these into the fields on the nav bar.
				</p>
				<aside>
				<h4>Advanced Options <more :hidden="aside.d" @toggle="toggleAside('d')"/></h4>
				<div v-show="aside.d">
				<p>
				Click the <b>Advanced Options</b> button to check on your preferences. Options so far include:
				</p>
				<dl>
				<dt>
				One Sheet At a Time
				</dt>
				<dd>
				If selected, this option will load individual sheets from your spreadsheet instead of the whole thing at once.
				By default, the first sheet will be loaded initially, and you will be able to choose other sheets from a drop-down menu.
				With this option, <code v-pre>{{ doc.name }}</code> will be the name of your sheet, and <code v-pre>{{ doc.content }}</code> will contain all of your rows.
				</dd>
				<dt>Detect Nested Data</dt>
				<dd>
				If you use this option, the app will attempt to detect when your data is <b>nested</b> by checking to see if either
				the first or second column is empty. <b>Nested</b> rows will be appended to the nearest parent, adding the field <b>nested</b> to
				your data. It might look like <code v-pre>{{ thread.nested }}</code> (if <b>thread</b> is the name you're using to refer
				to rows in your sheet).
				<dt>Use Label Row</dt>
				<dd>
				This is the only option that's selected by default. Using it will make the app treat <i>the first row in each 
				sheet</i> like a row of labels for the columns. This will give you a set of "friendly" names for the rows.
				</dd>
				</dl>
				</div>
				</aside>
				<p>Log in.</p>
				</div>
				<p class="note">
				Although the app calls this logging in, <b>you are not creating an account of any kind</b>. Your credentials
				and your template will be saved <b>as local storage (or cookies)</b> on your machine, and if you log out
				<i>your settings and your template will be lost</i>. Be sure to save your template somewhere safe, before you
				log out!
				</p>
				<h2>Using the Template Editor <more :hidden="step.h" @toggle="toggleStep('h')"/></h2>
				<div v-show="step.h">
				<p>Take your templateified code snippet from Step 1.3 and paste it into the textarea labeled
				"Your Template". Hit the <b>Save</b>.
				</p>
				<p>
				If you like, you can preview the code by hitting <b>Show Preview</b>! This will only be an <i>approximation</i>
				of the final appearance, since we all know that Dreamwidth's HTML implementation is a bit... special.
				</p>
				<p>
				If your layout doesn't make use of <code>&lt;raw-code></code> tags, you can more easily get an idea of what
				it will look like on your journal by selecting the <b>Show White Space</b> option above your template.
				</p>
				</div>
				<h2>Exporting Your Code <more :hidden="step.i" @toggle="toggleStep('i')"/></h2>
				<div v-show="step.h">
				<p>Once you're satisfied with your template, it's time to grab that HTML for posting on your journaling platform!</p>
				<p>Hit <b>Export</b> and a modal will open up with your HTML.</p>
				<p class="note">If your HTML looks a bit intimidating, that's because it's been run <i>through your browser's
				HTML parser</i> and turned into what it thinks is the best possible HTML. In particular, modern browsers will
				replace all of the 'simple' color values (like <code>#000000</code> for black) with <b>rgb</b> values (like 
				<code>rgb(0, 0, 0)</code>. A bit dense, but no harm done.</p>
				</div>

				<p class="note">
				Values of "yes", "no", "true", and "false" will become actual, useable booleans, so that you can do this --
				<code v-pre>&lt;b>&lt;template v-if="thread.completed">✓&lt;/template>&lt;template v-else>✘&lt;/template>&lt;/b></code>
				(or, since this is a very simple situation where we want the two options to have <i>identical</i> formatting...)
				<code v-pre>&lt;b>{{ thread.completed ? '✓' : '✘' }}&lt;/b></code>
				-- to make a checkmark show up when a thread is complete, and an X show up when it's not.
				</p>
				<p class="nav"><a href="#top">Back to Top</a></p>
				<h1 id="template-syntax">Template Syntax</h1>
				<p>
				This editor uses <a href="vuejs.org/guide/syntax.html">VueJS syntax</a>. Anything you can do in Vue,
				you can do here! (Check out that link for a more in-depth break down.)
				But you'll probably mostly be using the following:
				</p>
				<h2><code v-pre>{{ thread.date }}</code> to render variables <more :hidden="aside.e" @toggle="toggleAside('e')"/></h2>
				<div v-show="aside.e">
				<p>Anything that isn't inside an HTML attribute gets rendered like this!</p>
				<p>You can also get a little more fancy with filters, like so:</p>
				<p><code v-pre>{{ thread.characters | lowercase }}</code></p>
				<p>There are a handful of filters included in this app, used just like that -- a single | character,
				followed by the name of the filter. (In the case of the <code>date</code> filter, you also
				pass a format to it in parentheses -- <code v-pre>date("MMMM")</code> to print the full name of the
				month, for example.
				</p>
				<p class="note">
				The date filter uses <b>MomentJS</b> on the backend, <a href="https://momentjs.com/docs/#/displaying/">and
				all of its formats work</a>.
				</p>
				<h3>Other Filters <more :hidden="aside.f" @toggle="toggleAside('f')"/></h3>
				<ul v-show="aside.f">
				<li>date: Formats a date</li>
				<li>lowercase: makes a string lowercase</li>
				<li>uppercase: MAKES A STRING UPPERCASE</li>
				<li>capitalizeWords: Makes A String Capitalized</li>
				<li>reverse: gnirts a sesreveR</li>
				</ul>
				</div>
				<h2><code>v-bind</code> to render variables <i>in</i> HTML attributes  <more :hidden="aside.g" @toggle="toggleAside('g')"/></h2>
				<div v-show="aside.g">
				<p>When you need to put a variable inside an attribute (like in the SRC of an <code>&lt;img</code>, or
				the HREF of an <code>&lt;a</code>, you need to <i>bind</i> it.</p>
				<p><code v-pre>&lt;a v-bind:href="thread.Link">{{ thread.title }}&lt;/a></code></p>
				<p>Or, you can use the shorthand: <b>:</b>, as in <code v-pre>&lt;a :href="thread.link"></code>!</p>
				</div>
				<h2><code>v-if</code> and <code>v-else</code>  <more :hidden="aside.h" @toggle="toggleAside('h')"/></h2>
				<div v-show="aside.h">
				<p>If you have chunks of HTML you want to <i>conditionally</i> show, these are the statements for you!</p>
				<p>For example, maybe you have a row indicating <b>Completed</b> threads. You want to show a special 
				piece of code only on these threads. <code>v-if</code> to the rescue!</p>
				<pre class="scrolling"><code v-pre>&lt;div>
				&lt;a :href="thread.link">{{ thread.title }}&lt;/a> // {{ thread.characters }} &lt;span v-if="thread.completed">[&lt;b>complete&lt;/b>]&lt;/span>
				&lt;/div></code></pre>
				</div>
				<h2><code>v-for="item in items"</code> to repeat code <more :hidden="aside.i" @toggle="toggleAside('i')"/></h2>
				<div v-show="aside.i">
				<p>
				This attribute can be put on <i>any</i> HTML element and used to repeat chunks of code.
				</p>
				<p>
				In Step 1.3.2, we used <code>v-for</code> to repeat the rows in each sheet by putting a v-for on
				the outer <code>&lt;div</code> that surrounded the part of our code snippet where we'd usually
				have to manually copy-and-paste.
				</p>
				<p class="note">This can, of course, also be used on <code>&lt;table></code> and <code>&lt;td></code> elements!</p>
				<p>
				When what you want to copy doesn't <i>have</i> an easy-to-grab containing element, you can just use
				Vue's own <code>&lt;template>&lt;/template></code> element!
				</p>
				<p>
				For a very simplified example:
				</p>
				<pre class="pre-scrolling" v-pre><code>&lt;template v-for="thread in threads">
				&lt;b>{{ thread.title }}&lt;/b> - &lt;a :href="thread.link">{{ thread.characters }}&lt;/a>
				&lt;/template></code></pre>
				</div>
				<p>
				...and that should about do it for this simplied list!
				</p>
				</div>
			</section>
		</main>
	</transition>
</template>

<script>
// dependencies
import { forEach } from "lodash";
// child components
import More from "./More";
import TableOfContents from "./TableOfContents";
// properties
const alphabet = {};
forEach([...Array(26).keys()], (value, index) => {
	alphabet[String.fromCharCode(index + 97)] = true;
});
const alphabetClone = Object.assign({}, alphabet);
// component
export default {
	// child components
	components: {
		More,
		TableOfContents,
	},
	// computed bindings
	data() {
		return {
			step: alphabet,
			aside: alphabetClone,
		};
	},
	// methods
	methods: {
		toggleStep(step) {
			this.step[step] = !this.step[step];
		},
		toggleAside(aside) {
			this.aside[aside] = !this.aside[aside];
		},
	},
};
</script>

<style lang="sass">
@import "~STYLES/components/guide/read-me.scss";
</style>
