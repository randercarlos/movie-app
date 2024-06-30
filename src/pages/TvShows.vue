<template>
  <!-- start popular-tv -->
  <div class="container mx-auto px-4 pt-16">
    <div class="popular-shows">
      <h2 class="uppercase tracking-wider text-orange-500 text-2xl font-semibold">
        {{ t("tvShows.popularShows") }}
      </h2>
      <TvShowList
        v-if="popularTvShows.length > 0"
        :tv-shows="popularTvShows"
      />
    </div>
    <!-- end popular-tv -->

    <!-- start top-rated-shows -->
    <div class="top-rated-shows py-24">
      <h2 class="uppercase tracking-wider text-orange-500 text-2xl font-semibold">
        {{ t("tvShows.topRatedShows") }}
      </h2>
      <TvShowList
        v-if="topRatedTvShows.length > 0"
        :tv-shows="topRatedTvShows"
      />
    </div>
    <!-- end top-rated-shows -->
  </div>
</template>

<script setup lang="ts">
import TvShowList from "@/components/tv-show/TvShowList.vue";
import { shallowRef, type MaybeRef } from "vue";
import { handleError } from "@/utils/handleError";
import { useTvShowGenres } from "@/composables/tv-show/useTvShowGenres";
import type { TvShow, TvShowGenresResponse, TvShowResponse } from "@/typings/interfaces";
import { useTopRatedTvShows } from "@/composables/tv-show/useTopRatedTvShows";
import { usePopularTvShows } from "@/composables/tv-show/usePopularTvShows";
import { useTvShowsModelView } from "@/composables/tv-show/useTvShowsModelView";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const popularTvShows = shallowRef<TvShow[]>([]);
const topRatedTvShows = shallowRef<TvShow[]>([]);

try {
  const { data: tvShowsGenresResponse } = await useTvShowGenres();
  const { data: popularTvShowsResponse } = await usePopularTvShows();
  const { data: topRatedTvShowsResponse } =
    await useTopRatedTvShows();

  const { data: popularTvShowsModelView } = useTvShowsModelView(
    popularTvShowsResponse as MaybeRef<TvShowResponse>,
    tvShowsGenresResponse as MaybeRef<TvShowGenresResponse>
  );
  popularTvShows.value = popularTvShowsModelView.value;

  const { data: topRatedTvShowsModelView } = useTvShowsModelView(
    topRatedTvShowsResponse as MaybeRef<TvShowResponse>,
    tvShowsGenresResponse as MaybeRef<TvShowGenresResponse>
  );
  topRatedTvShows.value = topRatedTvShowsModelView.value;
} catch(err: unknown) {
  handleError("Error on show tv shows.", err as Error);
}
</script>
