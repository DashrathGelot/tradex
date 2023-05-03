class Api::V1::UsersController < ApplicationController
  skip_before_action :authorize_user, only: :signup
  def show
    render json: @current_user
  end
  def signup
    user = User.create!(user_params)
    render json: user, status: :created
  end
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
