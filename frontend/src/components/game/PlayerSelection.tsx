import React from "react";

type Props = {
    multiplayerEnabled: boolean;
    onPlayerOneChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPlayerTwoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onMultiplayerToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PlayerSelection = ({ multiplayerEnabled, onPlayerOneChange, onPlayerTwoChange, onMultiplayerToggle }: Props) => (
    <div className="flex flex-col w-full pb-5 sm:pb-0">
        <div className="flex flex-col sm:flex-row justify-between sm:justify-around items-center">
            <div className="w-full sm:w-48 flex flex-col items-center">
                <h3 className="pb-1 hidden sm:block">Player One</h3>
                <h3 className="pb-1 block sm:hidden">Player</h3>
                <input 
                    type="text" 
                    placeholder="Enter Your Name"
                    className="border border-gray-300 focus:border-blue-500 focus:outline-none rounded-md px-3 py-2 w-[85%] xl:w-full"
                    onChange={onPlayerOneChange}
                />
            </div>
            <div className="w-48 hidden sm:flex flex-col items-center">
                <h3 className="pb-1">Player Two</h3>
                <input 
                    type="text" 
                    placeholder="Enter Your Name"
                    className="border border-gray-300 focus:border-blue-500 focus:outline-none rounded-md px-3 py-2 w-[85%] xl:w-full"
                    disabled={!multiplayerEnabled}
                    onChange={onPlayerTwoChange}
                />
            </div>
        </div>
        <div className="hidden sm:flex justify-center mt-4">
            <input 
                type="checkbox" 
                name="multiplayer" 
                id="multiplayerCheckbox" 
                className="mr-4"
                onChange={onMultiplayerToggle}
            />
            <label htmlFor="multiplayerCheckbox">Multiplayer</label>
        </div>
    </div>
);