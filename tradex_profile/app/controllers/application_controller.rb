class ApplicationController < ActionController::API
  include ActionController::Cookies
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable
  before_action :authorize_user

  private
  def authorize_user
    @current_user = User.find_by(id: session[:user_id])
    render json: { error: "unauthorized" }, status: :unauthorized unless @current_user
  end
  def render_unprocessable(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

end
