import { SiGoogleplay, SiAppstore } from "react-icons/si";

const AppLink = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-6 pt-14 pb-14">
            <h1 className="md:text-3xl text-2xl font-medium">
                Get Our App
            </h1>
            <p className="md:text-base text-gray-500/80">
                Download the app for the best experience and latest updates.
            </p>

            <div className="flex gap-4">
                {/* Play Store */}
                <a
                    href="https://play.google.com/store/apps/details?id=your.app.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                    <SiGoogleplay className="text-2xl" />
                    Google Play
                </a>

                {/* App Store */}
                {/* <a
                    href="https://apps.apple.com/app/idYOUR_APP_ID"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                    <SiAppstore className="text-2xl" />
                    App Store
                </a> */}
            </div>
        </div>
    );
};

export default AppLink;
