class Api::V1::FavoritesController < ApplicationController
  def show
    favorites = @current_user.favorites
    render json: favorites
  end
end
