<!-- mobile navbar -->
<div class="md:hidden">
  <div class="navbar">
    <div class="">
      <a href="/"><Logo /></a>
      
    </div>
    <div class="dropdownmenu">
      <nav class:open={isMenuOpen}><ul>
        <li><a on:click={toggleMenu} href="/books">Bücher</a></li>
        <li><a on:click={toggleMenu} href="/">CDL Protokolle</a></li>
        <li><a on:click={toggleMenu}  href="/">Leseproben</a></li>
      </ul></nav>
    </div>
    <button on:click={toggleMenu} class="burger">
      <div class="bar-1"></div>
      <div class="bar-2"></div>
      <div class="bar-3"></div>
    </button>
  </div>
  
</div>

<!-- desktop navbar-->
<div class="hidden md:block">
  <a href="/"><Logo /></a>
  <div id="desktopmenu" class="flex flex-row bg-slate-300 w-full space-x-5">

    <a href="/buecher">Bücher</a>
    <a  href="/">CDL Protokolle</a>
    <a  href="/">Leseproben</a>
  </div>

</div>



<script>
import Logo from "./Logo.svelte";
let isMenuOpen = false;

let toggleMenu = ()=>{
  isMenuOpen = !isMenuOpen;
}
</script>

<style>



  ul#desktopmenu li{
    display: inline;
  }

  a:active{
    @apply underline decoration-zinc-800 bg-green-300 ;
  }
  .navbar{
    @apply bg-lime-200 flex justify-between items-center relative w-full 
  }

  nav{
    @apply hidden
  }

  nav.open{
    @apply absolute top-[100%] left-0 w-full bg-yellow-300 text-center block
  }
  ul{
    @apply grid gap-y-4 my-5
  } 
  .burger{@apply h-7 w-7 bg-transparent border-2 border-cyan-700 rounded mr-2 pl-1 }

  .burger > div{
    @apply h-[2px] w-[14px] absolute bg-cyan-700  
  }

  .bar-1{
    @apply translate-y-[5px]
  }

  .bar-3{
    @apply -translate-y-[5px]
  }


</style>
