export function removeTags(str: string): string|false {
	if ((str === null) || (str === ''))
		return false;
	else
		str = str.toString();

	// Regular expression to identify HTML tags in
	// the input string. Replacing the identified
	// HTML tag with a null string.
	return str.replace(/(<([^>]+)>)/ig, '');
}

export function capitalize(word: string): string{
	return word.charAt(0).toUpperCase() + word.slice(1);
}

// database helper

export async function getNewId(table){
    console.log('neue id ermitteln');
    const { data: maxid, error } = await supabase
  .from(table)
  .select('id')
  .order('id', { ascending: false })
  .limit(1).single();
  if(error){
      console.log('es gab einen fehler bei der ermittlung der id ', error);
        return fail(400) 
  }
  const id = Number(maxid.id) + 1;
  console.log('neue id ist ', table, id );
    return id

}