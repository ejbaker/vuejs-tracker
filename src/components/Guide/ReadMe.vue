<template>
	<transition name="bounce">
		<main v-once>
			<h1>How to Use This App</h1>
			<p>
				I'll have something nice here eventually. In the meantime, <a href="https://imgur.com/a/bXms0">this IMGUR gallery</a> should get you started!
			</p>
			<h2>A Word On Labels</h2>
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
				(all lowercase, replacing the space with an underscore, and removing the non-alphanumeric character). Values of
				"yes", "no", "true", and "false" will become actual, useable booleans, so that you can do this --
				<code v-pre>&lt;b>&lt;template v-if="thread.completed">✓&lt;/template>&lt;template v-else>✘&lt;/template>&lt;/b></code>
				-- to make a checkmark show up when a thread is complete, and an X show up when it's not.
			</p>
			<h2>Template Syntax</h2>
			<p>
				This editor uses <a href="vuejs.org/guide/syntax.html">VueJS syntax</a>. Anything you can do in Vue,
				you can do here! (Check out that link for a more in-depth break down.)
				But you'll probably mostly be using the following:
			</p>
			<div v-pre>
				<ul>
					<li>
						<b>{{ mustaches/handlebars }}</b> surround variables when they're outside HTML attributes.
					</li>
					<li>
						When they're <i>inside</i> HTML attributes, you'll need to use <b>v-bind:</b> to <i>bind</i> the variable 
						to the element instead. For example:
						<code>&lt;a v-bind:href="thread.Link">{{ thread.Title }}&lt;/a></code>
						<br>
						Or, you can use the easier shorthand: <b>:</b>, as in <code>&lt;a :href="thread.Link"></code>
					</li>
					<li>
						Wherever your template needs to repeat, use <b>&lt;template v-for="x in y"></b>. For example:
						<code>&lt;template v-for="thread in threads">
								{{ thread.title }}
							&lt;/template></code>
						<br>
						Or, in a more realistic example...
						(The &lt;!-- comments are just for illustration purposes --> )
						<br><br>
						<code>&lt;template v-for="sheet in doc">
							&lt;!-- your sheet label, such as "MAY, 2017", with a date filter applied that shows just the name ("May") -->
							&lt;h1>{{ sheet.name | date("MMMM") }}</h1>
							&lt;!-- each thread in your sheet (the extra return before the closing template is for Dreamwidth, so that it'll add a line break -->
							&lt;template v-for="threads in sheet">
							&lt;div>&lt;a :href="thread.Link">{{ thread.title }}&lt;/a> - {{ thread.characters_names }} - {{ thread.description }}&lt;/div>
							&lt;!-- if you chose to enable nesting detection, this will print out any sub-threads for the above thread -->
							&lt;template v-for="nested in thread.nested">
							- &lt;a :href="nested.:Link">{{ nested.characters_names }}&lt;/a> - {{ nested.description }}

							&lt;/template>
							&lt;!-- end of the nesting -->

							&lt;/template>
							&lt;!-- end of the thread -->

							&lt;/template>
							&lt;!-- end of the sheet -->
						</code>
					</li>
				</ul>
			</div>
			<!-- 
			<table-of-contents/>
			<h1 id="about-this-app">About This App</h1>
			<p>Blah blah explaining the purpose</p>
			<h2 id="before-you-start">Before You Start</h2>
			<ul>
				<li>You will need a Google Spreadsheet of your characters' threads</li>
				<li>And a free API key from Google.</li>
			</ul>
				<p class="note">
					If you're feeling extra paranoid, you can create an entirely separate Google account just for this!
					Just make sure you create the Google Sheets document and API key under the same name.
				</p>
			<h3>
				Creating a Google Spreadsheet
				<input type="button" class="btn btn-sm btn-info" @click="showStep('a')" :value="step['a'] ? 'Hide' : 'Show'"/>
			</h3>
			<div v-show="step.a">
				La.
			</div>
			<h3>
				Getting an API Key
				<input type="button" class="btn btn-sm btn-info" @click="showStep('b')" :value="step['b'] ? 'Hide' : 'Show'"/>
			</h3>
			<div v-show="step.b">
				<ul>
					<li>
						Create an API key <a href="https://console.developers.google.com/projectselector/apis/credentials">here</a>.
						<ul>
							<li>
								You might see a message that says, "Page not viewable with current selection. To view this page, select a project."
								You will probably have to create a project, so click "CREATE".
							</li>
							<li>
								Call it anything you want; I called mine "Thread Tracker". Agree to the ToS (and opt out of emails).
							</li>
							<li>
								Now we can "Create Credentials". When you click the box, you'll be asked what kind you want... choose "API Key".
							</li>
						</ul>
					</li>
					<li>
						<strong>For extra security</strong>, be sure to click "Restrict Key".
						<ul>
							<li>Give it a name</li>
							<li>
								Restrict it via "HTTP Referrers", and put
								<code>
									https://s.codepen.io/*
								</code>
								in the box.
							</li>
							<li>
								Click save.
							</li>
						</ul>
					</li>
					<li>
						Now we need to enable the Google Spreadsheets API for our key.
						<ul>
							<li>Click on "DASHBOARD" from the left-hand panel.</li>
							<li>Type "sheets" in the search box to find Google Spreadsheets.</li>
							<li>Click "ENABLE".</li>
						</ul>
					</li>
				</ul>
			</div>
			-->
		</main>
	</transition>
</template>

<script>
// dependencies
import { forEach } from "lodash";
// child components
import TableOfContents from "./TableOfContents";
// properties
const mapped = {};
forEach([...Array(26).keys()], (value, index) => {
	mapped[String.fromCharCode(index + 97)] = false;
});
// component
export default {
	// child components
	components: {
		TableOfContents,
	},
	// computed bindings
	data() {
		return {
			step: mapped,
		};
	},
	// methods
	methods: {
		showStep(step) {
			this.step[step] = !this.step[step];
		},
	},
};
</script>

<style lang="sass">
@import "~STYLES/components/guide/read-me.scss";
ul li
	margin-bottom: 10px
code
	display: block
	white-space: pre-line
</style>
