import './index.ts';

function PostNamazu (c: 'command', p: string): never;
function PostNamazu (c: 'place', p: string): never;
function PostNamazu (c: 'mark', p: string): never;
function PostNamazu (c: 'preset', p: string): never;
function PostNamazu (c: 'queue', p: string): never;
function PostNamazu (c: string, p: string) {
	console.log('[PostNamazu]', c, p);
	callOverlayHandler({call: 'PostNamazu', c, p});
}

export default PostNamazu;
