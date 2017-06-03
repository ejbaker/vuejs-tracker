export default `<center><raw-code><div style="width: 600px; border-radius: 15px; padding: 15px; border: solid 1px #1e6f5f; background-color: #d6ecea; background-image: url(http://imgur.com/39EfctA.png); background-repeat: repeat; box-shadow: 2px 2px 0px #a0adae; text-align: left;">

<!--MONTH BEGIN-->
<template v-for="page in doc">
<span style="color: #004343; font-family: minerva, sans-serif; font-size: 18pt; text-transform: uppercase; letter-spacing: 0.2em; line-height: 24pt; font-weight: bold; text-shadow: -2px -2px 0px #fff, 0px -2px 0px #fff, 2px -2px 0px #fff, -2px  0px 0px #fff, 2px 0px 0px #fff, -2px 2px 0px #fff, 0px  2px 0px #fff, 2px 2px 0px #fff; padding-left: 25px;">{{ page.name | date("MMMM✦YYYY") }}</span>

<template v-for="thread in page.content">
<div style="background-color: #00565b; padding: 10px; border-radius: 10px; border: solid 1px #fff; color: #d6ecea; margin-bottom: 5px;"><a :href="thread.Link" style="color: #fff; font-weight: bold; text-shadow: -1px -1px 0px #5a9185, 0px -1px 0px #5a9185, 1px -1px 0px #5a9185, -1px  0px 0px #5a9185, 1px 0px 0px #5a9185, -1px 1px 0px #5a9185, 0px  1px 0px #5a9185, 1px 1px 0px #5a9185; text-decoration: none; letter-spacing: 0.2em;">{{ thread.Type }} ▸</a> <span style="color: #aacfd1; font-weight: normal; font-style: italic; letter-spacing: 0.1em;">{{ thread.Label }}</span><br/>
<div style="line-height:11pt;">
<!--YOUR TEXT BEGINS HERE-->
{{ thread.Description }}
<template v-for="nested in thread.Nested">
<blockquote>
<a :href="nested.Link" style="color: #fff; font-weight: bold; text-shadow: -1px -1px 0px #5a9185, 0px -1px 0px #5a9185, 1px -1px 0px #5a9185, -1px  0px 0px #5a9185, 1px 0px 0px #5a9185, -1px 1px 0px #5a9185, 0px  1px 0px #5a9185, 1px 1px 0px #5a9185; text-decoration: none; letter-spacing: 0.2em;">{{ nested.Label }} ▸</a> {{ nested.Description }}
</blockquote>
</template>
<!--YOUR TEXT ENDS HERE--></div></div>
</template>

<!--MONTH END-->
</template>

<center><span style="line-height: 8px; font-weight: bold; color: #399ba1; text-shadow: -2px -2px 0px #fff, 0px -2px 0px #fff, 2px -2px 0px #fff, -2px  0px 0px #fff, 2px 0px 0px #fff, -2px 2px 0px #fff, 0px  2px 0px #fff, 2px 2px 0px #fff;">CODED BY <a href="http://bootycall.dreamwidth.org" style="color: #004343; text-decoration: none;">BOOTYCALL</a></span></center>   
</div></raw-code></center>`;
