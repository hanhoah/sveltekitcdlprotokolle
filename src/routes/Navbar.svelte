<script>
  import Logo from "./Logo.svelte";
  let isMenuOpen = false;
  
  let toggleMenu = ()=>{
    isMenuOpen = !isMenuOpen;
  }

</script>

<!-- mobile navbar -->
<div class="md:hidden">
  <div class="navbar-mobile">
    <div class="">
      <a href="/"><Logo /></a>
      
    </div>
    <div class="dropdownmenu">
      <nav class:open={isMenuOpen}><ul>
        <li><a on:click={toggleMenu} href="/buecher">Bücher</a></li>
        <li><a on:click={toggleMenu} href="/cdl-protokolle">CDL Protokolle</a></li>
        <li><a on:click={toggleMenu}  href="/produkte">Produkte</a></li>
        <li><a on:click={toggleMenu}  href="/gutscheine">Gutscheine</a></li>
        <li><a on:click={toggleMenu}  href="/leseproben">Leseproben</a></li>
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
  <div class="navbar-desktop space-x-20">
    <a class="w-full" href="/"><Logo /></a>
    <div id="desktopmenu" class="flex flex-row w-full space-x-5 pr-2">
        <a class="menuitem" href="/buecher">Bücher</a>
        <a class="menuitem"  href="/cdl-protokolle">CDL Protokolle</a>
        <a class="menuitem"  href="/produkte">Produkte</a>
        <a class="menuitem"  href="/gutscheine">Gutscheine</a>
        <a class="menuitem"  href="/leseproben">Leseproben</a>
    </div>
  </div>
</div>  


<style>

.menuitem{
  @apply hover:underline hover:font-bold;
}

  ul#desktopmenu li{
    display: inline;
  }

  a:active{
    @apply underline decoration-zinc-800 bg-green-300 ;
  }
  .navbar-mobile{
    @apply bg-lime-200 flex justify-between items-center relative w-full 
  }

  .navbar-desktop{
    @apply bg-lime-200 md:flex justify-between items-center relative w-full hidden 
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
