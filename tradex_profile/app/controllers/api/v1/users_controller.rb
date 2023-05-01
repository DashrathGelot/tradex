class Api::V1::UsersController < ApplicationController
  skip_before_action :authorize_user, only: :create
  def show
    render json: @current_user
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
