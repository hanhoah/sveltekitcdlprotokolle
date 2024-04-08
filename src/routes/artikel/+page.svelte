<script>
    export let data
    let posts = data.posts
</script>

<ul>
    {#each posts as post }


    <li><a href="/artikel/{post.slug}">{post.title}</a> </li>
    
    
    {/each}
</ul>
