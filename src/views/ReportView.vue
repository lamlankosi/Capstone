<template>
  <div class="container-fluid">
    <div class="row">
        <h2>contact us</h2>
        <div class="row">
          <form
                action="https://formspree.io/f/xblrwvkb"
                method="POST"
              >
                <label>
                  Your email:
                  <input type="email" name="email">
                </label>
                <label>
                  Your message:
                  <textarea name="message"></textarea>
                </label>

                <button type="submit">Send</button>
              </form>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>