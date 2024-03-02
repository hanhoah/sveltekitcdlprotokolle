<script>
	import "../app.css";
	import Footer from "./Footer.svelte";
  import { page } from "$app/stores";
  import Navbar from "./Navbar.svelte";
  import { inject } from '@vercel/analytics'
  import 'iconify-icon'
  </script>

<svelte:head>
  <title>{$page.data.title || 'CDL Protokolle '}</title>
</svelte:head>

  <!-- mobile Display -->
  <div class="bg-white max-w-screen-md m-auto md:block justify-center items-center text-black">
    <div class="w-full mx-auto px-">
      <!-- 1280w (800h)-->
       <Navbar />
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
