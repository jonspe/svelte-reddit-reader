<script>
	const getPosts = async function () {
		return fetch("https://www.reddit.com/.json")
			.then((response) => response.json())
			.then((data) => data.data.children);
	};
	const getDurationString = function (from, to) {
		const diff = to - from;
		if (diff < 60000) {
			return "just now";
		} else if (diff >= 60000 && diff < 3600000) {
			return `${~~(diff / 60000)} minutes ago`;
		} else if (diff >= 3600000 && diff < 216000000) {
			return `${~~(diff / 3600000)} hours ago`;
		} else if (diff >= 216000000) {
			return `${~~(diff / 216000000)} days ago`;
		}
		return "long ago";
	};
	const getUtcDate = function (utcSeconds) {
		const date = new Date(0);
		date.setUTCSeconds(utcSeconds);
		return date;
	};
	let promise = getPosts();
</script>

<style>
	ul {
		column-count: 1;
		column-gap: 1.4rem;
		padding: 0;
	}
	a {
		color: black;
	}
	div.overlay {
		position: absolute;
		margin: 0;
		padding: 0.4rem 1.2rem;
		z-index: 1;
		color: white;
		width: calc(100% - 2.4rem);
		background: rgb(0, 0, 0, 0.25);
		display: flex;
		justify-content: space-between;
	}
	div.overlay > * {
		margin: 0;
	}
	ul li {
		list-style-type: none;
		background: white;
		box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.15);
		border-radius: 12px;
		break-inside: avoid;
		margin-bottom: 1.4rem;
		position: relative;
	}
	h2 {
		margin: 0;
		padding: 1rem 1.2rem;
		font-size: 1.2rem;
		font-weight: 600;
		display: block;
	}
	footer {
		display: flex;
		justify-content: space-between;
	}
	footer a {
		padding: 1rem 1.2rem;
	}
	img {
		width: 100%;
		height: 200px;
		object-fit: cover;
		display: block;
	}
	@media (min-width: 900px) {
		ul {
			column-count: 2;
		}
	}
	@media (min-width: 1400px) {
		ul {
			column-count: 3;
		}
	}
	@media (min-width: 1800px) {
		ul {
			column-count: 4;
		}
	}
</style>

{#await promise then posts}
	<ul>
		{#each posts as post}
			<li>
				<a href={post.data.url_overridden_by_dest || post.data.url}>
					<h2>{post.data.title}</h2>
					<div class="overlay">
						<p class="score">{post.data.score}</p>
						<p class="duration">
							{getDurationString(getUtcDate(post.data.created_utc), new Date())}
						</p>
					</div>
					<img src={post.data.thumbnail} alt="" />
				</a>
				<footer>
					<a href={'https://www.reddit.com/u/' + post.data.author}>
						/u/{post.data.author}
					</a>
					<a href={'https://www.reddit.com' + post.data.permalink}>
						{post.data.num_comments}
						comments
					</a>
				</footer>
			</li>
		{/each}
	</ul>
{/await}
