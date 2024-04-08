<script>
    export let data
    let posts = data.posts
</script>

<ul>
    {#each posts as post }


    <li><a href="/artikel/{post.slug}">{post.id}</a> </li>
    
    
    {/each}
</ul>
