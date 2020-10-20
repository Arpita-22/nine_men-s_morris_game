class GamesController < ApplicationController
    def index
        games = Game.all
        render json: games, include[:players]
    end
end
