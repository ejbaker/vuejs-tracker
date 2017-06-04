<template>
	<main>
		<h4 class="small">
			<slot name="message">
				Unfortunately, there has been some sort of error. Here are some things you can try!
			</slot>
		</h4>
		<ul>
			<slot name="solutions">
				<li>Refresh the page.</li>
				<li>Log out and log back in.</li>
				<li>Double check your credentials.</li>
				<li>Contact the developer!</li>
			</slot>
		</ul>
	</main>
</template>

<script>
// component
export default {};
</script>
