<script>
	import "../app.css";
	import Footer from "./Footer.svelte";
  import { page } from "$app/stores";
  import Navbar from "./Navbar.svelte";
  import { inject } from '@vercel/analytics'
  import Icon from "@iconify/svelte";

  </script>

<svelte:head>
  <title>{$page.data.title || 'CDL Protokolle '}</title>
</svelte:head>

  <!-- mobile Display -->
  <div class="bg-white max-w-screen-md m-auto md:block justify-center items-center text-black">
    <div class="w-full mx-auto px-">
      <!-- 1280w (800h)-->
       <Navbar />
       <!--
         <form class="flex border-2 justify-center items-center" method="post" action="/search">
          <input class="w-full border-0 border-collapse border-gray-400" type="text" name="search" placeholder="Wonach suchen Sie?" />
          <button class="border-1 border-collapse border-gray-400 p-2" type="submit"><Icon width="24" icon="ion:search-outline" /></button>
        </form>

       -->
	   <div class=""/>
      <slot />
    </div>
    <Footer />
  </div>



  <!--

light
  yellow-300
  teal-200
  green-500
  lime-200


dark
  cyan-700

  -->
