import {useCallback, useEffect, useState} from "preact/hooks";
import {CloseIcon, MenuIcon} from "./components/icon.tsx";
import {MdOutlineEmail} from "react-icons/md";
import {FaTelegramPlane} from "react-icons/fa";
import {VscGithub} from "react-icons/vsc";
import {Loading} from "./components/loading.tsx";
import {MarkdownWidget} from "./components/post.tsx";

export function App() {
    return (
        <div id={"scroll"} class={"bg-gradient-to-br from-blue-50 via-white via-50% to-purple-50 w-full h-full overflow-y-auto dark:from-blue-950 dark:to-purple-950"}>
            <NaviBar/>
            <div class={"max-w-screen-xl m-auto pb-8 relative"}>
                <MeCard/>
                <AboutCard/>
                <ProjectsCard/>
                <BlogPart/>
            </div>
        </div>
    )
}

function NaviBar() {
    const [width, setWidth] = useState(window.innerWidth);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [scrollUnder, setScrollUnder] = useState(false);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        const scroll = document.getElementById("scroll");
        const handleScroll = () => {
            if (scroll) {
                setScrollUnder(scroll.scrollTop > 0);
            }
        }
        scroll?.addEventListener('scroll', handleScroll);
        return () => scroll?.removeEventListener('scroll', handleScroll);
    }, []);

    const onNaviTap = useCallback(() => {
        setIsMenuOpen(false);
    }, [])

    return <div class={`sticky top-0 ${scrollUnder && "bg-white shadow dark:bg-gray-800"} z-50 duration-200`}>
        <div className={`h-14 w-full px-6 flex items-center max-w-screen-xl mx-auto`}>
            <span className={"text-blue-600 text-2xl font-bold dark:text-blue-300"}>nyne.dev</span>
            <span className={"flex-grow"}></span>
            {width > 600 && <>
              <NaviItem name={"About"} href={"#about"}/>
              <NaviItem name={"Projects"} href={"#projects"}/>
              <NaviItem name={"Blog"} href={"#blog"}/>
            </>}
            {width <= 600 &&
              <button className={"hover:bg-blue-100 active:bg-blue-200 rounded-full duration-200 p-2 dark:hover:bg-blue-800 dark:active:bg-blue-700"} onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
              }}>
                <MenuIcon/>
              </button>}
            {isMenuOpen && <div
              className={"z-50 fixed top-0 bottom-0 left-0 right-0 backdrop-blur bg-opacity-85 bg-white animate-opacity-in flex items-center flex-col dark:bg-black dark:bg-opacity-85"}>
              <div className={"w-full h-14 flex px-6 items-center"}>
                <span className={"flex-grow"}></span>
                <button className={"hover:bg-blue-100 active:bg-blue-200 rounded-full duration-200 p-2 dark:text-white dark:hover:bg-blue-800 dark:active:bg-blue-700"}
                        onClick={() => {
                            setIsMenuOpen(!isMenuOpen);
                        }}>
                  <CloseIcon/>
                </button>
              </div>
              <NaviItem name={"About"} href={"#about"} onTap={onNaviTap}/>
              <span className={"h-2"}></span>
              <NaviItem name={"Projects"} href={"#projects"} onTap={onNaviTap}/>
              <span className={"h-2"}></span>
              <NaviItem name={"Blog"} href={"#blog"} onTap={onNaviTap}/>
            </div>}
        </div>
    </div>
}

function NaviItem({name, href, onTap}: { name: string, href: string, onTap?: () => void }) {
    return <div onClick={() => {
        const element = document.querySelector(href);
        if (element) {
            onTap?.();
            element.scrollIntoView({behavior: "smooth"});
        }
    }} className={"cursor-pointer mx-1 flex items-center justify-center w-24 h-10 hover:text-blue-700 " +
        "hover:bg-blue-100 rounded-3xl duration-200 active:bg-blue-200 text-gray-700 " +
        "dark:text-gray-200 dark:hover:bg-blue-800 dark:active:bg-blue-700 dark:hover:text-blue-200"}>
        {name}
    </div>
}

function MeCard() {
    return <div class={"flex flex-col items-center my-8"}>
        <div class={"relative w-40 h-40"}>
            <div
                className={"absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-lg opacity-75 dark:from-blue-800 dark:to-purple-800"}/>
            <div class={"absolute z-10 inset-1"}>
                <img src={"https://avatars.githubusercontent.com/u/67669799?v=4"} alt={"avatar"}
                     className={"rounded-full border-4 border-white"}/>
            </div>
        </div>
        <p class={"font-bold text-3xl my-4 text-blue-700"}>nyne</p>
        <div class={"h-2"}></div>
        <div class={"flex"}>
            <SocialLink icon={<MdOutlineEmail/>} text={"Email"} url={"mailto:me@nyne.dev"}></SocialLink>
            <span className={"w-2"}></span>
            <SocialLink icon={<FaTelegramPlane/>} text={"Telegram"} url={"https://t.me/nyne_official"}></SocialLink>
            <span className={"w-2"}></span>
            <SocialLink icon={<VscGithub/>} text={"Github"} url={"https://github.com/wgh136"}></SocialLink>
        </div>
    </div>
}

function SocialLink({icon, text, url}: { icon: any, text: string, url: string }) {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <a href={url} target={"_blank"}>
        <div className={"rounded-lg h-10 border flex flex-row items-center cursor-pointer duration-150 " +
            "hover:bg-gray-50 dark:border-gray-400 dark:hover:bg-gray-700 shadow-sm px-3"}>
            <div className={"flex items-center justify-center text-xl h-full"}>
                {icon}
            </div>
            {width > 400 && <div className={"flex-grow pl-3"}>
                {text}
            </div>}
        </div>
    </a>
}

function AboutCard() {
    return <>
        <div class={"h-6"}></div>
        <h1 class={"w-full h-12 flex items-center text-3xl font-bold my-4 pl-6"} id={"about"}>About</h1>
        <div className={"mx-4 bg-white shadow rounded-2xl p-6 dark:bg-gray-800"}>
            <h2 className={"font-bold text-xl text-blue-600 mb-2 dark:text-blue-300"}>About Me</h2>
            <p>I'm a student working towards becoming a full stack engineer.</p>
            <div class={"h-4"}></div>
            <div class={"flex flex-wrap gap-2"}>
                <Badge text={"React"}/>
                <Badge text={"Flutter"}/>
                <Badge text={"Gin"}/>
                <Badge text={"Golang"}/>
                <Badge text={"JavaScript"}/>
                <Badge text={"TypeScript"}/>
                <Badge text={"Python"}/>
                <Badge text={"Dart"}/>
            </div>
        </div>
    </>
}

function Badge({text}: { text: string }) {
    return <div className={"rounded-full bg-blue-100 px-2 sm:px-4 py-0.5 sm:py-1 text-sm text-blue-600 dark:bg-blue-800 dark:text-blue-200"}>
        {text}
    </div>
}

function ProjectsCard() {
    return <>
        <div className={"h-6"}></div>
        <h1 className={"w-full h-12 flex items-center text-3xl font-bold my-4 pl-6"} id={"projects"}>Projects</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4">
            <Project
                name={"Venera"}
                description={"A comic app built with Flutter. Supports reading comics from various sources."}
                url={"https://github.com/venera-app/venera"}
                tags={["flutter", "dart", "comic", "Android", "iOS", "Windows", "MacOS", "Linux"]}
                image={"/venera.png"}
            />
            <Project
                name={"Pixes"}
                description={"Unofficial Pixiv client built with Flutter. Supports browsing and downloading images."}
                url={"https://github.com/wgh136/pixes"}
                tags={["flutter", "dart", "comic", "Android", "iOS", "Windows", "MacOS", "Linux"]}
                image={"/pixes.png"}
            />
            <Project
                name={"Memento"}
                description={"A simple and fast note-taking app built with Golang. Supports multi-user, markdown, tag management."}
                url={"https://github.com/useMemento/memento"}
                tags={["golang", "typescript", "echo", "web", "react", "markdown", "note", "tag"]}
                image={"/memento.png"}
            />
        </div>
    </>
}

function Project({name, description, url, tags, image}: {
    name: string,
    description: string, url: string, tags: string[], image: string
}) {
    return <a href={url} target={"_blank"}>
        <div className={"duration-200 h-64 shadow bg-white rounded-2xl p-4 flex flex-grow flex-col dark:bg-gray-800 hover:shadow-md"}>
            <div className={"flex w-full"}>
                <div className={"flex-grow pr-2 sm:pr-4"}>
                    <h2 className={"font-bold text-xl text-blue-600 mb-2 dark:text-blue-300"}>
                        {name}
                    </h2>
                    <p>{description}</p>
                    <div className={"h-2"}></div>
                </div>
                <div className={"flex-shrink-0 w-14 min-[340px]:w-20 sm:w-24"}>
                    <img src={image} alt={name} className={"rounded"}/>
                </div>
            </div>
            <div className={"flex-grow"}></div>
            <div className={"flex flex-wrap gap-1 sm:gap-2"}>
                {tags.map(tag => <Badge text={tag}/>)}
            </div>
        </div>
    </a>
}

interface Post {
    content: string;
    createdAt: string;
    postID: string;
}

function BlogPart() {
    const [posts, setPosts] = useState<Post[] | null>(null);

    useEffect(() => {
        fetch("https://note.nyne.dev/api/post/userPosts?username=nyne&page=0", {}).then(async (v) => {
            const json = await v.json();
            setPosts(json.posts);
        })
    }, []);

    return <>
        <div className={"h-6"}></div>
        <h1 className={"w-full h-12 flex items-center text-3xl font-bold my-4 pl-6"} id={"blog"}>Blog</h1>
        <div class={"px-4"}>
            {posts === null && <div class={"h-12 w-full flex items-center justify-center"}>
                <Loading/>
            </div>}
            {posts !== null && posts.map(post => <PostCard post={post}/>)}
        </div>
        <div class={"flex flex-row-reverse px-6"}>
            <a class={"bg-blue-500 shadow text-white px-3 py-2 rounded-3xl hover:bg-opacity-90 duration-200 dark:bg-blue-600"} href={"https://note.nyne.dev/user/nyne"}>View More</a>
        </div>
    </>
}

function PostCard({post}: {post: Post}) {
    return <a href={`https://note.nyne.dev/public/article/${post.postID}`} target={"_blank"}>
        <div className={"shadow w-full p-4 bg-white rounded-2xl my-4 hover:shadow-md duration-200 dark:bg-gray-800"}>
            <MarkdownWidget content={post.content}></MarkdownWidget>
        </div>
    </a>
}