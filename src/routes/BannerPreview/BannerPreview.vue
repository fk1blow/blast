<template>
  <div class="container content">
    <div class="row">
      <breadcrumbs go-to="Banner-Images" class="col-md-12" />
    </div>

    <main>
      <div class="row">
        <div class="col-md-5">
          <section class="variants-alternatives">
            <div class="form-group">
              <label for="check-all-slides-variants">
                <input
                  v-on:click="previewToggleSlidesType(0) && handleVariantEditCancel()"
                  :checked="settingsSlidesType === 0"
                  type="radio"
                  name="select-variant-slides-type"
                  id="check-all-slides-variants"
                />

                Run all variants with individual slides
              </label>
            </div>

            <div class="form-group">
              <label for="check-specific-slides-variants">
                <input
                  v-on:click="previewToggleSlidesType(1) && handleVariantEditCancel()"
                  :checked="settingsSlidesType === 1"
                  type="radio"
                  name="select-variant-slides-type"
                  id="check-specific-slides-variants"
                />
                Run with the same slides
              </label>
            </div>

            <div v-if="settingsSlidesType === 1" class="form-group select-images">
              <button
                v-on:click="handleOpenUniversalSlidesModal"
                class="btn btn-primary"
                name="select-all-variants-images"
              >
                Select images
              </button>

              <span v-if="settingsUniversalSlides.length <= 0">
                no images selected
              </span>
              <span v-else>
                {{settingsUniversalSlides.filter(item => item.checked === true).length}}
                images selected
              </span>
            </div>
          </section>

          <section class="variants-list">
            <header><h2>1. Annoncevarianter</h2></header>

            <div v-for="(item, idx) in settingsVariants">
              <div class="form-group">
                <div class="clearfix">
                  <button
                    v-on:click="handleVariantEditOpen(item, idx)"
                    class="variant-modify"
                    :class="{ inactive: item.VariantActive === false }"
                  >

                    <i class="fa fa-plus-circle" aria-hidden="true"></i>

                    <span>Rediger tekstvariant {{Number(idx) + 1}}</span>
                  </button>

                  <button
                    :disabled="item.VariantActive ? false : true"
                    class="see-preview"
                    v-on:click="handleBannerGeneratePreview(item)"
                    :class="{ inactive: item.VariantActive === false }"
                  >
                    Se i preview
                  </button>
                </div>

                <div>
                  <input
                    v-on:click="handleVariantToggleActive(item)"
                    :checked="item.VariantActive ? 'checked' : false"
                    :id="'text-variant-' + item.VariantID"
                    type="checkbox"
                  />

                  <label :for="'text-variant-' + item.VariantID">Aktivér variant </label>
                </div>
              </div>
            </div>


            <div class="preview-variant-editor" v-if="currentEdit !== null">
              <div class="form-group">
                <header><h2>1a. Facebook overskrift</h2></header>

                <input
                  ref="variant_input_headline"
                  class="form-control"
                  v-on:keyup="previewVariantEditContentField({
                    item: currentEdit.item,
                    value: $event.target.value
                  })"
                  :value="currentEdit.item.MetaDescription.Content"
                  type="text"
                />

                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </div>

              <div class="form-group">
                <header><h2>1b. Facebook & Instagram tekst</h2></header>

                <textarea
                  ref="variant_input_description"
                  class="form-control"
                  v-on:keyup="previewVariantEditHeadlineField({
                    item: currentEdit.item,
                    value: $event.target.value
                  })"
                  type="text">{{currentEdit.item.MetaDescription.Headline}}</textarea>

                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </div>

              <div class="form-group">
                <header><h2>1c. Facebook beskrivelse</h2></header>

                <textarea
                  class="form-control"
                  v-on:keyup="previewVariantEditDescriptionField({
                    item: currentEdit.item,
                    value: $event.target.value
                  })"
                  type="text">{{currentEdit.item.MetaDescription.Description}}</textarea>

                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </div>

              <footer>
                <button
                  v-on:click="handleVariantEditClose"
                  class="btn btn-primary form-control"
                >
                  Ok
                </button>

                <button
                  v-if="settingsSlidesType === 0"
                  v-on:click="handleOpenIndividualSlidesModal"
                  class="btn btn-secondary form-control"
                >
                  Select Images
                </button>
              </footer>
            </div>
          </section>

          <aside>
            <p>
              Antal annoncervarianter: {{totalVariantsCount}}
            </p>
          </aside>

          <section class="variants">
            <header><h2>2. Annonce til profilering</h2></header>

            <div class="form-group">
              <div class="clearfix">
                <button class="variant-modify">
                  <i class="fa fa-plus-circle" aria-hidden="true"></i>
                  <span>Rediger tekstvariant 1</span>
                </button>
                <button class="see-preview disabled" disabled>Se i preview</button>
              </div>
            </div>

            <div class="form-group">
              <div class="clearfix">
                <button class="variant-modify">
                  <i class="fa fa-upload" aria-hidden="true"></i>
                  <span>Upload Profilbillede</span>
                </button>
                <button class="see-preview">Vælg fil</button>
              </div>
            </div>
          </section>

          <aside>
            <p class="text-center">
              Hvis annonceteksterne ikke redigeres, benyttes teksterne fra C&B
            </p>
          </aside>
        </div>

        <div class="col-md-6 col-lg-offset-1">
          <section v-if="errors.length > 0" class="variants-errors">
            <h2>
              <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
              {{problemMessagePluralize(errors.length)}}
            </h2>

            <ul v-for="error in errors">
              <li>{{error.description}}</li>
            </ul>
          </section>

          <section>
            <carousel-placeholder :loaded="previewFrameLoaded" class="preload text-center">
              <div
                v-html="previewFrame"
                ref="previewBanner"
              />
            </carousel-placeholder>
          </section>
        </div>
      </div>
    </main>

    <div class="row">
      <div class="col-md-5">
        <app-footer
          next-page="/review"
          v-on:before-next="gotoNextStep"
          v-bind:navigate-when="errors.length === 0"
        >
          Gem og gennemse kampagne
        </app-footer>
      </div>
    </div>

    <simplert
      :useRadius=false
      :useIcon=true
      ref="simplert">
    </simplert>

    <modal ref="modalUniversal" noHeader :clickOutsideToClose="true">
      <div slot="body">
        <image-picker
          v-on:toggle="handleImageToggle"
          :images="settingsUniversalSlides" />
      </div>

      <div slot="footer" class="text-left">
        <button
          v-on:click="handleCloseUniversalSlidesModal"
          class="btn btn-primary"
        >
          Close
        </button>
      </div>
    </modal>

    <modal ref="modalIndividual" noHeader :clickOutsideToClose="true">
      <div slot="body">
        <image-picker
          v-on:toggle="handleImageToggle"
          :images="individualSlides" />
      </div>

      <div slot="footer" class="text-left">
        <button
          v-on:click="handleCloseIndividualSlidesModal"
          class="btn btn-primary"
        >
          Close
        </button>
      </div>
    </modal>
  </div>
</template>

<script src="./BannerPreview.js"></script>

<style scoped lang="scss" src="./BannerPreview.scss"></style>
