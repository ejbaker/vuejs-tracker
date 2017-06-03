<template>
	<transition name="modal">
		<div class="modal-backdrop">
			<div class="modal" @click.self="$emit('close')">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" @click="$emit('close')" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<slot name="header">
								Modal
							</slot>
						</div>
						<div class="modal-body">
							<slot name="body">
								default body
							</slot>
						</div>
						<div class="modal-footer">
							<slot name="footer"/>
							<button type="button" class="btn btn-primary" @click="$emit('close')">Close</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {};
</script>

<style scoped lang="sass">
@import "~STYLES/components/modal.scss";
</style>
